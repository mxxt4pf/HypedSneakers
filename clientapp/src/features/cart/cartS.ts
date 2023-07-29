import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosAPI from "../../clientapp/clientAPI/Axios";
import { Cart } from "../../clientapp/model/ShoppingCart";

interface CartState {
  Cart: Cart | null;
  status: string;
}

const initialState: CartState = {
  Cart: null,
  status: "idle",
};

export const addCartItemAsync = createAsyncThunk<
  Cart,
  { itemId: number; quantity?: number }
>("Cart/addCartItemAsync", async ({ itemId, quantity = 1 }, thunkAPI) => {
  try {
    return await axiosAPI.ShoppingCart.addItem(itemId, quantity);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const removeCartItemAsync = createAsyncThunk<
  void,
  { itemId: number; quantity: number; name?: string }
>("Cart/removeCartItemASync", async ({ itemId, quantity }, thunkAPI) => {
  try {
    await axiosAPI.ShoppingCart.deleteItem(itemId, quantity);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.Cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCartItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.itemId;
    });
    builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
      state.Cart = action.payload;
      state.status = "idle";
    });
    builder.addCase(addCartItemAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });
    builder.addCase(removeCartItemAsync.pending, (state, action) => {
      state.status =
        "pendingRemoveItem" + action.meta.arg.itemId + action.meta.arg.name;
    });
    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
      const { itemId, quantity } = action.meta.arg;

      const itemIndex = state.Cart?.cartItems.findIndex(
        (i) => i.itemId === itemId
      );

      if (itemIndex === -1 || itemIndex === undefined) return;

      var pQ = state.Cart!.cartItems[itemIndex].purchasedQuantity;
      pQ = pQ - quantity;

      if (state.Cart?.cartItems[itemIndex].purchasedQuantity === 0) {
        state.Cart.cartItems.splice(itemIndex, 1);

        state.status = "idle";
      }
    });
    builder.addCase(removeCartItemAsync.rejected, (state, action) => {
      state.status = "idle";

      console.log(action.payload);
    });
  },
});

export const { setCart } = CartSlice.actions;
