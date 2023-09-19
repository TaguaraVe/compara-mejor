import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store/store';

export const fetchUsers = createAsyncThunk('users/getAllUsers', async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users?_limit=1'
  );
  const data = await response.json();
  return data;
});

const user: User =
  typeof window !== 'undefined' && sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user'))
    : {
        id: '',
        email: '',
        name: '',
        user_role: '',
      };

const initialState = {
  currentUser: user,
  loading: false,
  showModalEmail: false,
} as any;

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    removeUser: (state) => {
      state.currentUser = {
        id: '',
        email: '',
        name: '',
        user_role: '',
      };
    },
    openModalEmail: (state) => {
      state.showModalEmail = true;
    },
    closeModalEmail: (state) => {
      state.showModalEmail = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.entities.push(...action.payload);
    });

    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { setUser, removeUser, openModalEmail, closeModalEmail } =
  userSlice.actions;

export const selectShowModalEmail = (state: RootState) =>
  state.user.showModalEmail;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
