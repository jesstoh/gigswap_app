import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  gigs: [],
  status: 'idle',
  error: null,
  errorCode: null,
  pageCount: 0, //Capture how many pages from api
  activeGig: {
    gig: null,
    status: 'idle',
    error: null,
    edit: false,
    success: null,
  },
};

export const fetchGigs = createAsyncThunk(
  'gigs/fetchGigs',
  async (urlQuery, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/gigs/${urlQuery ? urlQuery : ''}`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const fetchRecommendedGigs = createAsyncThunk(
  'gigs/fetchRecommendedGigs',
  async (urlQuery, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/gigs/recommended/${
          urlQuery ? urlQuery : ''
        }`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const fetchSingleGig = createAsyncThunk(
  'gigs/fetchSingleGig',
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/gigs/${gigId}/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      console.log(err.response);
      return rejectWithValue({ data, status });
    }
  }
);

//Create gig by hirer
export const addGig = createAsyncThunk(
  'gigs/addGig',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/gigs/`,
        data
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

//Edit gig by gig poster
export const editGig = createAsyncThunk(
  'gigs/editGig',
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/gigs/${id}/`,
        data
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Fetch all gigs of login hirer, may be redundant (to consider remove)
export const fetchHirerGigs = createAsyncThunk(
  'gigs/fetchHirerGigs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/gigs/hirer/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Owner close or cancel gig
export const closeGig = createAsyncThunk(
  'gigs/closeGig',
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/gigs/${gigId}/close/`
      );
      return { data: response.data, gigId };
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Owner award gig
export const awardGig = createAsyncThunk(
  'gigs/awardGig',
  async ({ gigId, winnerId }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/gigs/${gigId}/award/`,
        { winner: winnerId }
      );
      return { data: response.data, winnerId };
    } catch (err) {
      const { data, status } = err.response;
      // console.log(err.response)
      return rejectWithValue({ data, status });
    }
  }
);

// Owner accept deliverable
export const acceptGigCompletion = createAsyncThunk(
  'gigs/acceptGigCompletion',
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/gigs/${gigId}/complete/`
      );
      return { data: response.data, gigId };
    } catch (err) {
      const { data, status } = err.response;
      // console.log(err.response)
      return rejectWithValue({ data, status });
    }
  }
);

// Talent confirm payment
export const confirmGigPayment = createAsyncThunk(
  'gigs/confirmGigPayment',
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/gigs/${gigId}/pay/`
      );
      return { data: response.data, gigId };
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

//Reviewing talent
export const createTalentReview = createAsyncThunk(
  'gigs/createTalentReview',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/reviews/talent/`,
        data
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

//Reviewing hirer
export const createHirerReview = createAsyncThunk(
  'gigs/createHirerReview',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/reviews/hirer/`,
        data
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Login talent flag active gig
export const flagGig = createAsyncThunk(
  'gigs/flagGig',
  async ({ gigId, userId }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/gigs/${gigId}/flag/`
      );
      return { data: response.data, userId };
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Login talent unflag active gig
export const unflagGig = createAsyncThunk(
  'gigs/unflagGig',
  async ({ gigId, userId }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/gigs/${gigId}/unflag/`
      );
      return { data: response.data, userId };
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

const gigsSlice = createSlice({
  name: 'gigs',
  initialState,
  reducers: {
    toggleGigEdit(state, action) {
      state.activeGig.edit = !state.activeGig.edit;
    },
    //Placeholders to set error and success messages
    setActionSuccess(state, action) {
      state.activeGig.success = action.payload;
    },
    setActionError(state, action) {
      state.activeGig.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Update gigs state when fetchGigs success
    builder.addCase(fetchGigs.fulfilled, (state, action) => {
      //   console.log(action.payload);
      state.gigs = action.payload.gigs;
      state.pageCount = action.payload.pageCount;
      state.status = 'succeeded';
    });
    // Change status to loading when fetching
    builder.addCase(fetchGigs.pending, (state, action) => {
      state.status = 'loading';
    });
    // Change status to failed & set error, when fetchGigs rejected
    builder.addCase(fetchGigs.rejected, (state, action) => {
      state.status = 'failed';
      // Change it to other content later
      state.error = action.error.message;
    });
    builder.addCase(fetchSingleGig.pending, (state, action) => {
      state.activeGig.status = 'loading';
    });
    builder.addCase(fetchSingleGig.fulfilled, (state, action) => {
      state.activeGig.gig = action.payload;
      state.activeGig.status = 'succeeded';
    });
    builder.addCase(fetchSingleGig.rejected, (state, action) => {
      state.activeGig.error = action.payload.data.detail;
      state.activeGig.status = 'failed';
      if (action.payload.status === 404) {
        state.activeGig.error = 'Gig not found';
      }
    });
    // Update gigs state when fetchGigs success
    builder.addCase(fetchRecommendedGigs.fulfilled, (state, action) => {
      state.gigs = action.payload.gigs;
      state.pageCount = action.payload.pageCount;
      state.status = 'succeeded';
    });
    builder.addCase(fetchRecommendedGigs.pending, (state, action) => {
      state.status = 'loading';
    });
    // Change status to failed & set error, when fetchGigs rejected
    builder.addCase(fetchRecommendedGigs.rejected, (state, action) => {
      state.status = 'failed';
      // Change it to other content later
      state.error = action.payload.data.detail;
      state.errorCode = action.payload.status;
    });
    builder.addCase(addGig.fulfilled, (state, action) => {
      state.activeGig.gig = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(addGig.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(addGig.rejected, (state, action) => {
      state.status = 'failed';
      state.error = Object.values(action.payload.data)[0][0];
      state.errorCode = action.payload.status;
    });
    builder.addCase(editGig.fulfilled, (state, action) => {
      state.activeGig.gig = action.payload;
      state.activeGig.status = 'succeeded';
      state.activeGig.edit = false;
    });
    builder.addCase(editGig.pending, (state, action) => {
      state.activeGig.status = 'loading';
    });
    builder.addCase(editGig.rejected, (state, action) => {
      state.activeGig.status = 'failed';
      state.activeGig.error = Object.values(action.payload.data)[0][0];
    });
    builder.addCase(fetchHirerGigs.fulfilled, (state, action) => {
      state.gigs = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchHirerGigs.pending, (state, action) => {
      state.status = 'loading';
    });
    // // Change status to failed & set error, when fetchGigs rejected
    // builder.addCase(fetchHirerGigs.rejected, (state, action) => {
    //   state.status = 'failed';
    //   state.error = action.payload.data.detail;
    // });
    builder.addCase(closeGig.fulfilled, (state, action) => {
      state.activeGig.gig.is_closed = true;
    });
    builder.addCase(awardGig.fulfilled, (state, action) => {
      state.activeGig.gig.winner = { id: action.payload.winnerId };
    });
    builder.addCase(acceptGigCompletion.fulfilled, (state, action) => {
      state.activeGig.gig.is_completed = true;
    });
    builder.addCase(confirmGigPayment.fulfilled, (state, action) => {
      state.activeGig.gig.paid = true;
    });
    builder.addCase(createTalentReview.fulfilled, (state, action) => {
      state.activeGig.gig.is_talent_reviewed = true;
    });
    builder.addCase(createHirerReview.fulfilled, (state, action) => {
      state.activeGig.gig.is_hirer_reviewed = true;
    });
    builder.addCase(flagGig.fulfilled, (state, action) => {
      state.activeGig.gig.flag.push(action.payload.userId);
    });
    builder.addCase(unflagGig.fulfilled, (state, action) => {
      //Find index of login talent in flag list
      const index = state.activeGig.gig.flag.indexOf(action.payload.userId);
      // Remove user from flag list
      if (index !== -1) {
        state.activeGig.gig.flag.splice(index, 1);
      }
    });
  },
});

export default gigsSlice.reducer;

export const {
  toggleGigEdit,
  setActionSuccess,
  setActionError,
} = gigsSlice.actions;
