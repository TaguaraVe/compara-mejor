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
  typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
      };

const initialState = {
  currentUser: user,
  entities: [],
  loading: false,
  showModalEmail: false,
  showModalCalendar: false,
  showModalConfirmDate: false,
  especialista: {
    id: '',
    especialidad: '',
    rating: 0,
    descripcion: '',
    First_name: '',
    Last_name: '',
    Email: '',
    avatar: '',
  },
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
        fisrtName: '',
        lastName: '',
      };
      state.entities = [];
    },
    setEspecialista: (state, action) => {
      state.especialista = action.payload;
    },
    removeEspecialista: (state) => {
      state.especialista = initialState.especialista;
    },
    openModalConfirmDate: (state) => {
      state.showModalConfirmDate = true;
    },
    closeModalConfirmDate: (state) => {
      state.showModalConfirmDate = false;
    },
    openModalEmail: (state) => {
      state.showModalEmail = true;
    },
    closeModalEmail: (state) => {
      state.showModalEmail = false;
    },
    openModalCalendar: (state) => {
      state.showModalCalendar = true;
    },
    closeModalCalendar: (state) => {
      state.showModalCalendar = false;
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

export const {
  setEspecialista,
  removeEspecialista,
  setUser,
  removeUser,
  openModalCalendar,
  closeModalCalendar,
  openModalConfirmDate,
  closeModalConfirmDate,
  openModalEmail,
  closeModalEmail,
} = userSlice.actions;

export const selectShowModalCalendar = (state: RootState) =>
  state.user.showModalCalendar;
export const selectShowModalConfirmDate = (state: RootState) =>
  state.user.showModalConfirmDate;
export const selectShowModalEmail = (state: RootState) =>
  state.user.showModalEmail;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectEspecialista = (state: RootState) => state.user.especialista;

export default userSlice.reducer;
