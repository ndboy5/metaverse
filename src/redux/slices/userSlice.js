import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../../services/AxiosService";

/*** Thunks */
// Async thunk to register a new user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ firstname, lastname, email, password, address }) => {
    const response = await axiosService.post("blockchain", {
      action: "registerUser",
      payload: { firstname, lastname, email, password, address },
    });
    return response.data;
  }
);

// Async thunk to fetch all users
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
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
    const users = await NFTMarketContract.getAllUserProfiles();
    return users.map((item) => ({
      // status: item.status,
      // nftContract: item.nftContract,
      // owner: item.owner,
      // creator: item.creator,
      // token: item.token.toNumber(),
      // price: ethers.utils.formatEther(item.price),
    }));
  }
);

// Async thunk to add an admin
export const addAdmin = createAsyncThunk(
  "user/addAdmin",
  async ({ adminAddress }, { getState }) => {
    const { account, networkId } = getState().connection;
    if (!account) throw new Error("Wallet not connected");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const NFTMarketContract = new ethers.Contract(
      NFTMarketContractAddress,
      NFTMarketABI.abi,
      signer
    );
    const items = await NFTMarketContract.addAdmin(adminAddress);
    return items.map((item) => ({
      // status: item.status,
      // nftContract: item.nftContract,
      // owner: item.owner,
      // creator: item.creator,
      // token: item.token.toNumber(),
      // price: ethers.utils.formatEther(item.price),
    }));
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [fetchUsers.pending]: (state) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [addAdmin.pending]: (state) => {
      state.loading = true;
    },
    [addAdmin.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;
