import { createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import NFTMarketABI from "../abi/NFTMarket.json";
import NFTABI from "../abi/NFT.json";

const NFTMarketContractAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDR;
const NFTContractAddress = process.env.NEXT_PUBLIC_NFT_ADDR;

const initialState = {
  provider: null,
  signer: null,
  NFTMarketContract: null,
  NFTContract: null,
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    initializeConnection: (state, action) => {
      state.provider = new ethers.providers.JsonRpcProvider(
        process.env.SEPOLIA_RPC_URL
      );
      state.signer = state.provider.getSigner();
      state.NFTMarketContract = new ethers.Contract(
        NFTMarketContractAddress,
        NFTMarketABI,
        state.signer
      );
      state.NFTContract = new ethers.Contract(
        NFTContractAddress,
        NFTABI,
        state.signer
      );
    },
  },
});

export const { initializeConnection } = connectionSlice.actions;

export default connectionSlice.reducer;
