import { createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import NFTMarketABI from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFTABI from "../../../artifacts/contracts/NFT.sol/NFT.json";

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
        process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL
      );

      //   console.log("SEPOLIA URL:", process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL);
      //   console.log("SEPOLIA URL:", process.env.SEPOLIA_PRIVATE_KEY);
      //   console.log("NFTMarketABI:", NFTMarketABI);
      //   console.log("NFTABI:", NFTABI);
      //   console.log("NFTMarketContractAddress:", NFTMarketContractAddress);
      //   console.log("NFTContractAddress:", NFTContractAddress);

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
