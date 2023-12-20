/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  currentUser,
  userLogin,
  userLogout,
  userRegister,
} from "./userActions";

interface InitialStateInterface {
  user: {
    name: string;
    email: string;
  } | null;
  token: string | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: string | null;
}

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState: InitialStateInterface = {
  user: {
    name: "",
    email: "",
  },
  token,
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        (state.isSuccess = true),
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          (state.user = payload?.user!);
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        state.token = payload?.accessToken!;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.error.message!;
      });

    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = null;
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        state.user = payload?.user!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        state.token = payload?.accessToken!;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.error.message!;
      });

    builder
      .addCase(currentUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = null;
        state.user = payload!;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.error.message!;
      });

    builder
      .addCase(userLogout.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = null;
        state.user = null;
        state.token = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.error.message!;
      });
  },
});

export default userSlice.reducer;
