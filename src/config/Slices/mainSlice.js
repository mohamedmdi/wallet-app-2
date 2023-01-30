import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    loading: true,
    user: {
      name: null,
      email: null,
      currency: { value: null },
      cardHolder: null,
      cardNumber: null,
      balance: null,
      expiry: { MM: null, YY: null },
    },
    expences: [
      {
        id: 1,
        nom: "null 1",
        value: 20,
      },
      {
        id: 2,
        nom: "null 2",
        value: 55,
      },
      {
        id: 3,
        nom: "null 3",
        value: 4,
      },
    ],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    addExpence: (state, action) =>{
      state.expences = [...state.expences, action.payload]
    },
    emptyUser: (state, action) => {
      state.user = {
        user: {
          name: null,
          email: null,
          currency: { value: null },
          cardHolder: null,
          cardNumber: null,
          balance: null,
          expiry: { MM: null, YY: null },
        },
      };
    },
  },
});

export const { setLoading, setUser, emptyUser,addExpence } = mainSlice.actions;
export default mainSlice.reducer;
