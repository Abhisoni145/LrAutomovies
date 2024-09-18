import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import noteService from './noteService';

const noteSlice = createSlice({
  name: 'note',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    notes: [],
    message: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // get
      .addCase(createNote.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.notes = [action.payload, ...state.notes];
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default noteSlice.reducer;

// get notes
export const getNotes = createAsyncThunk('FETCH/NOTES', async (_, thunkApi) => {
  let token = thunkApi.getState().auth.user.token;

  try {
    return await noteService.fetchNotes(id, token);
  } catch (error) {
    const message = error.response.data.message;
    return thunkApi.rejectWithValue(message);
  }
});

// ADD NOTE
export const createNote = createAsyncThunk(
  'ADD/NOTE',
  async (formData, thunkApi) => {
    let token = thunkApi.getState().auth.user.token;

    try {
      return await noteService.addNote(formData, token);
    } catch (error) {
      const message = error.response.data.message;

      return thunkApi.rejectWithValue(message);
    }
  }
);
