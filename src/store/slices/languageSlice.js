import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "tr", 
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload; 
    },
    toggleLanguage: (state) => {
      state.lang = state.lang === "tr" ? "en" : "tr";
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
