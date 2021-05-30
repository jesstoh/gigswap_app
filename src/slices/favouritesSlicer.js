import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  fav: [],
  status: 'idle',
  error: null,
};

export const fetchTalentFav = createAsyncThunk(
  'favourites/fetchTalentFav',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/talents/fav/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const fetchHirerFav = createAsyncThunk(
  'favourites/fetchHirerFav',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/hirers/fav/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

//Save talent
export const saveTalent = createAsyncThunk(
  'favourites/saveTalent',
  async ({ talentId, profileId }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/talents/${talentId}/save/`
      );
      return { data: response.data, profileId };
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const unsaveTalent = createAsyncThunk(
  'favourites/unsaveTalent',
  async ({ talentId, profileId }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/talents/${talentId}/unsave/`
      );
      return { data: response.data, profileId };
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update talent favourite list when fetch for login talent success
    builder.addCase(fetchTalentFav.fulfilled, (state, action) => {
      state.fav = action.payload;
      state.status = 'succeeded';
    });
    // Change status to loading when fetching
    builder.addCase(fetchTalentFav.pending, (state, action) => {
      state.status = 'loading';
    });
    // Change status to failed & set error, when not found
    builder.addCase(fetchTalentFav.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.data.detail;
    });
    // Update talent favourite list when fetch for login hirer success
    builder.addCase(fetchHirerFav.fulfilled, (state, action) => {
      state.fav = action.payload;
      state.status = 'succeeded';
    });
    // Change status to loading when fetching
    builder.addCase(fetchHirerFav.pending, (state, action) => {
      state.status = 'loading';
    });
    // Change status to failed & set error, when not found
    builder.addCase(fetchHirerFav.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.data.detail;
    });
    // Update talent lists when hirer save a talent
    builder.addCase(saveTalent.fulfilled, (state, action) => {
      state.fav.saved_talents_list.push(action.payload.profileId);
      // state.status = 'succeeded';
    });
    //Remote talent from saved list
    builder.addCase(unsaveTalent.fulfilled, (state, action) => {
      const index = state.fav.saved_talents_list.indexOf(
        action.payload.profileId
      );
      if (index !== -1) {
        state.fav.saved_talents_list.splice(index, 1);
      }
      // state.status = 'succeeded';
    });
  },
});

export default favouritesSlice.reducer;
