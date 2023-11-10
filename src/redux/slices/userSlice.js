import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";

// Async thunk to register a new user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ firstname, lastname, email, password, address }, { getState }) => {
    const { NFTMarketContract } = getState().connection;

    // Encrypt user data
    const encryptedFirstname = CryptoJS.AES.encrypt(
      firstname,
      process.env.SECRET_KEY
    ).toString();
    const encryptedLastname = CryptoJS.AES.encrypt(
      lastname,
      process.env.SECRET_KEY
    ).toString();
    const encryptedEmail = CryptoJS.AES.encrypt(
      email,
      process.env.SECRET_KEY
    ).toString();
    const encrytedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    ).toString();
    const encryptedAddress = CryptoJS.AES.encrypt(
      address,
      process.env.SECRET_KEY
    ).toString();

    // Call setUserProfile function from the contract
    const transaction = await NFTMarketContract.setUserProfile(
      ethers.utils.formatBytes32String(encryptedFirstname),
      ethers.utils.formatBytes32String(encryptedLastname),
      ethers.utils.formatBytes32String(encryptedEmail),
      ethers.utils.formatBytes32String(encrytedPassword),
      ethers.utils.formatBytes32String(encryptedAddress)
    );

    await transaction.wait();

    return { firstname, lastname, email, address }; // Return decrypted data for Redux state
  }
);

// Async thunk to fetch all users
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { getState }) => {
    const { NFTMarketContract } = getState().connection;
    const userProfiles = await NFTMarketContract.getAllUserProfiles();
    return userProfiles.map((profile) => ({
      firstnameHash: profile.firstnameHash,
      lastnameHash: profile.lastnameHash,
      emailHash: profile.emailHash,
      // addressHash: profile.addressHash
    }));
  }
);

// Async thunk to add an admin
export const addAdmin = createAsyncThunk(
  "user/addAdmin",
  async (adminAddress, { getState }) => {
    const { NFTMarketContract } = getState().connection;

    const transaction = await NFTMarketContract.addAdmin(adminAddress);
    await transaction.wait();

    return adminAddress; // Return the admin address added
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
  reducers: {
    // Reducers for handling additional actions
  },
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
      // handle admin addition logic, e.g., updating a list of admins
    },
    [addAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const {
  /* export any reducers if necessary */
} = userSlice.actions;
export default userSlice.reducer;
