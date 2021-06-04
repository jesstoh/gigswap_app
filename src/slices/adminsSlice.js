import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
    summary: null,
    users: '',
    status: 'idle',
    error: null,
}

const adminsSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {},
    extraReducers: builder => {

    }
})

export default adminsSlice.reducer;