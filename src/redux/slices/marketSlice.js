import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";

// Define the initial state for the market slice
const initialState = {
  marketItems: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch market items from the blockchain
export const fetchMarketItems = createAsyncThunk(
  "market/fetchMarketItems",
  async (_, { getState }) => {
    const state = getState();
    // Get the contract instance from state
    const { NFTMarketContract } = state.connection;
    const items = await NFTMarketContract.fetchMarketItems();
    // Serialize items to match the structure expected by the frontend
    return items.map((item) => ({
      status: item.status,
      nftContract: item.nftContract,
      owner: item.owner,
      creator: item.creator,
      token: item.token.toNumber(),
      price: ethers.utils.formatEther(item.price),
    }));
  }
);

// Create the market slice
export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    // Reducers go here
  },
  extraReducers: {
    [fetchMarketItems.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchMarketItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.marketItems = action.payload;
    },
    [fetchMarketItems.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export default marketSlice.reducer;
