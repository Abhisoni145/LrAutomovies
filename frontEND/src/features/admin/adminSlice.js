import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminService from './adminService';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    users: [],
    cars: [],
    notes: [],
    message: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getComplaint.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cars = action.payload;
      })
      .addCase(getComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAdminNotes.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getAdminNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.notes = action.payload;
      })
      .addCase(getAdminNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default adminSlice.reducer;

// GET ALL USERS
export const getAllUsers = createAsyncThunk(
  'ADMIN/FETCH/USERS',
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.fetchAllUsers(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getComplaint = createAsyncThunk(
  'ADMIN/FETCH/COMPLAINT',
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.fetchAllComplaints(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAdminNotes = createAsyncThunk(
  'ADMIN/FETCH/NOTES',
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.fetchAllNotes(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
