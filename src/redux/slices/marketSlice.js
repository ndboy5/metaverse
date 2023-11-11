import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../../services/AxiosService";

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
    [sellItem.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

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

export const sellItem = createAsyncThunk(
  "market/sellItem",
  async (itemData) => {
    const response = await axiosService.post("blockchain", {
      action: "sellItem",
      payload: itemData,
    });
    return response.data.data;
  }
);

export default marketSlice.reducer;
