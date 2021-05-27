import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    profile: null,
    status: 'idle',
    error: null
}

// Create slice for keeping profile of login in talent & hirer
const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers: {}
})



export default profileSlice.reducer;