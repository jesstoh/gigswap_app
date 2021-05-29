import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
    talents: [],
    status: 'idle',
    error: null,
    activeTalent: { talent: null, status: 'idle', error: null },
}

const talentsSlice = createSlice({
    name: 'talents',
    initialState,
    reducers: {},
    extraReducers: builder => {

    }
})


export default talentsSlice.reducer;