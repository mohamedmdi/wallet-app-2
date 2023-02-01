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
        nom: "Buying Mouse Buying Mouse Buying Mouse Buying Mouse Buying Mouse Buying Mouse Buying Mouse Buying Mouse Buying Mouse Buying Mouse ",
        price: 75,
        desc: "Description",
        date: "2023-01-31T16:37",
      },
      {
        id: 2,
        nom: "Paying Gas",
        price: 55,
        desc: "Description",
        date: "2023-01-31T16:37",
      },
      {
        id: 3,
        nom: "Week-Food",
        price: 250,
        desc: "Description",
        date: "2023-01-31T16:37",
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
    addExpence: (state, action) => {
      state.expences = [...state.expences, action.payload];
    },
    deleteExpence: (state, action) => {
      state.expences = state.expences.filter((e) => e.id != action.payload);
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

export const { setLoading, setUser, emptyUser, addExpence, deleteExpence } =
  mainSlice.actions;
export default mainSlice.reducer;
