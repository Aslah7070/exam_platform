
// Here the user and isAuth will be stored in store, and the user and token will be set in the cookies after login and we access it here, I ll add a hydrator incase the user and token are not set in the cookies



import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import axiosError from "@/lib/utils/axiosError";
import axiosInstance from "@/lib/utils/axiosInstance";
import { IUserPayload } from "@/lib/types/auth";
import { toast } from "react-toastify";


interface AuthState {
    user: IUserPayload | null;
    isAuth: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuth: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      if (!credentials.email || !credentials.password) {
        toast.error('Please provide both email and password');
        return rejectWithValue('Invalid credentials');
      }
      Cookies.remove('token');
      Cookies.remove('user');
      const baseURL = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await axios.post(
        `${baseURL}/auth/login`,
        credentials,
        {
          withCredentials: true,
        }
      );

      const { token, user } = response.data;
      Cookies.set('token', token);
      Cookies.set('user', JSON.stringify(user));
      toast.success('Login successful');
      window.location.href = '/';
      return { token, user };
    } catch (err) {
      return rejectWithValue(axiosError(err));
    }
  }
);


export const logout = createAsyncThunk('auth/logout', async () => {
  await axiosInstance.post(process.env.NEXT_PUBLIC_API_URL + '/auth/logout');
  Cookies.remove('token');
  Cookies.remove('user');
  return;
});


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    rehydrate: (state) => {
      if(typeof window !== 'undefined') {
        const token = Cookies.get('token');
        const user = Cookies.get('user');
        if (token) {
          state.isAuth = !!(token && user);
          state.user = user ? JSON.parse(user) : null;
        } else {
          state.isAuth = false;
          state.user = null;
        }
      }else{
        return state; // If not in browser, return current state
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; user: IUserPayload }>) => {
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        toast.error(action.payload as string);
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.user = null;
      });
  },
});

export const { rehydrate } = authSlice.actions;
export default authSlice.reducer;