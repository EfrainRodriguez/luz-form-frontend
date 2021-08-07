import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    formData: {}
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    changeFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload
      };
    }
  }
});

export const { setFormData, changeFormData } = formSlice.actions;

export default formSlice.reducer;
