import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../../services/AxiosService";

//**Thunks */
export const fetchCreatorItemsListed = createAsyncThunk(
  "market/fetchCreatorItemsListed",
  async () => {
    const response = await axiosService.post("blockchain", {
      action: "fetchCreatorItemsListed",
    });
    return response.data.data;
  }
);

export const fetchMarketItems = createAsyncThunk(
  "market/fetchMarketItems",
  async () => {
    const response = await axiosService.post("blockchain", {
      action: "fetchMarketItems",
    });
    return response.data.data;
  }
);

export const createAsset = createAsyncThunk(
  "market/createAsset",
  async ({ file, price }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("price", price);
    formData.append("action", "createAsset"); // Ensure this line is correctly appending the action

    const response = await axiosService.post("blockchain", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
);

const initialState = {
  marketItems: [],
  isLoading: false,
  error: null,
};

//Market slice to manage assets on block chain
const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMarketItems.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMarketItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.marketItems = action.payload;
    },
    [fetchMarketItems.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [createAsset.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export default marketSlice.reducer;
