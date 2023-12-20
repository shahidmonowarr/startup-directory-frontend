/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createAsyncThunk } from "@reduxjs/toolkit";

interface ICredential {
  name?: string;
  email: string;
  password: string;
}

interface LoginRegisterResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    user: {
      email: string;
      name: string;
    };
    accessToken: string;
  };
}

interface CurrentUserResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    user: {
      email: string;
      name: string;
    };
  };
}

const baseURL = "http://localhost:5000/api/v1";

export const userLogin = createAsyncThunk(
  "user/login",
  async (credentials: ICredential) => {
    try {
      const res = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const LoginResponse: LoginRegisterResponse = await res.json();

      const { user, accessToken } = LoginResponse.data;

      localStorage.removeItem("token");
      localStorage.setItem("token", accessToken);

      return { user, accessToken };
    } catch (error) {
      console.log(error);
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/register",
  async (credentials: ICredential) => {
    try {
      const res = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const registerResponse: LoginRegisterResponse = await res.json();

      const { user, accessToken } = registerResponse.data;

      localStorage.removeItem("token");
      localStorage.setItem("token", accessToken);

      return { user, accessToken };
    } catch (error) {
      console.log(error);
    }
  }
);

export const currentUser = createAsyncThunk("user/current-user", async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseURL}/auth/current-user`, {
      method: "GET",
      headers: {
        authorization: token!,
      },
      //   credentials: "same-origin",
    });

    const responseData: CurrentUserResponse = await res.json();

    const { user } = responseData.data;

    return user;
  } catch (error) {
    console.log(error);
  }
});

export const userLogout = createAsyncThunk("user/logout", async () => {
  try {
    const res = await fetch(`${baseURL}/auth/logout`);

    const responseData: CurrentUserResponse = await res.json();

    localStorage.removeItem("token");

    const { user } = responseData.data;

    return user;
  } catch (error) {
    console.log(error);
  }
});
