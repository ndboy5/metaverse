import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import NFTMarketABI from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const NFTMarketContractAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDR;

//**Thunks */
export const fetchCreatorItemsListed = createAsyncThunk(
  "market/fetchCreatorItemsListed",
  async (_, { getState }) => {
    const { account, networkId } = getState().connection;
    if (!account) throw new Error("Wallet not connected");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const NFTMarketContract = new ethers.Contract(
      NFTMarketContractAddress,
      NFTMarketABI.abi,
      signer
    );

    const items = await NFTMarketContract.fetchCreatorItemsListed();
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

export const fetchMarketItems = createAsyncThunk(
  "market/fetchMarketItems",
  async (_, { getState }) => {
    const { account, networkId } = getState().connection;
    if (!account) throw new Error("Wallet not connected");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const NFTMarketContract = new ethers.Contract(
      NFTMarketContractAddress,
      NFTMarketABI.abi,
      signer
    );

    const items = await NFTMarketContract.fetchMarketItems();
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

export const createAsset = createAsyncThunk(
  "market/createAsset",
  async ({ url, price }, { getState }) => {
    const { account, networkId } = getState().connection;
    if (!account) throw new Error("Wallet not connected");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const NFTMarketContract = new ethers.Contract(
      NFTMarketContractAddress,
      NFTMarketABI.abi,
      signer
    );
    const mintingCost = ethers.utils.parseUnits("0.0008", "ether");
    const parsedPrice = ethers.utils.parseUnits(price, "ether");

    const transaction = await NFTMarketContract.sellItem(url, parsedPrice, {
      value: mintingCost,
    });
    await transaction.wait();

    return { url, price };
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
    [fetchCreatorItemsListed.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCreatorItemsListed.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.creatorItems = action.payload;
    },
    [fetchCreatorItemsListed.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
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
