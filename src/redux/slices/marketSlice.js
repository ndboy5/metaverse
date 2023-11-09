// marketSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchItems, createItem } from "../../utils/contract";

// Async thunk for fetching items
export const fetchItemsAsync = createAsyncThunk(
  "market/fetchItems",
  async () => {
    const items = await fetchItems();
    return items;
  }
);

// Async thunk for creating an item
export const createItemAsync = createAsyncThunk(
  "market/createItem",
  async ({ url, price }) => {
    await createItem(url, price);
    const items = await fetchItems();
    return items;
  }
);

export const marketSlice = createSlice({
  name: "market",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchItemsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(createItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(createItemAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      });
  },
});

export default marketSlice.reducer;
