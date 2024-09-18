import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import carService from './carService';

const carSlice = createSlice({
  name: 'car',
  initialState: {
    car: null,
    cars: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },

  reducers: {
    reset: (state, action) => {
      state.car = null;
      state.cars = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(reaiseComplaint.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(reaiseComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.car = action.payload;
      })
      .addCase(reaiseComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      //
      .addCase(getComplaints.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getComplaints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cars = action.payload;
      })
      .addCase(getComplaints.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // single car get

      .addCase(getComplaint.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.car = action.payload;
      })
      .addCase(getComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // close
      .addCase(closeComplaint.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(closeComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.car = action.payload;
      })
      .addCase(closeComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = carSlice.actions;

export default carSlice.reducer;

// reise complaint
export const reaiseComplaint = createAsyncThunk(
  'CREATE/CAR',
  async (formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await carService.addCar(formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get complaints

export const getComplaints = createAsyncThunk(
  'FETCH/CARS',
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await carService.getCars(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// single car complain thunk
export const getComplaint = createAsyncThunk(
  'FETCH/CAR',
  async (id, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await carService.getCar(id, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// close
export const closeComplaint = createAsyncThunk(
  'FETCH/CLOSE',
  async (id, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await carService.updateComplaint(id, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
