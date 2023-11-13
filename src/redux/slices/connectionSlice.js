import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";

export const connectWallet = createAsyncThunk(
  "connection/connectWallet",
  async (_, { rejectWithValue }) => {
    if (typeof window.ethereum === "undefined") {
      return rejectWithValue("MetaMask is not installed");
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      return {
        account: accounts[0],
        networkId: network.chainId,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    account: null,
    networkId: null,
    isConnected: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [connectWallet.pending]: (state) => {
      state.isConnected = false;
    },
    [connectWallet.fulfilled]: (state, action) => {
      state.account = action.payload.account;
      state.networkId = action.payload.networkId;
      state.isConnected = true;
    },
    [connectWallet.rejected]: (state, action) => {
      state.error = action.payload;
      state.isConnected = false;
    },
  },
});

export default connectionSlice.reducer;
