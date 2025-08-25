// src/redux/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartModalOpen: false,
  succesModal: null, // null or { orderId: '123' }
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // Cart modal controls
    openCartModal: (state) => {
      state.isCartModalOpen = true;
    },
    closeCartModal: (state) => {
      state.isCartModalOpen = false;
    },
    setCartModalOpen: (state, action) => {
      state.isCartModalOpen = action.payload;
    },

    // Success modal controls
    openSuccesModal: (state, action) => {
      state.succesModal = action.payload; // expected: { orderId: 'xyz' }
    },
    closesuccesModal: (state) => {
      state.succesModal = null;
    },
  },
});

export const {
  openCartModal,
  closeCartModal,
  setCartModalOpen,
  openSuccesModal,
  closesuccesModal,
} = modalSlice.actions;

export default modalSlice.reducer;
