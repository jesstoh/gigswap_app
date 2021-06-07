import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    chatId: '',
    talent: '',
    hirer: ''
}


const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        
    }
})


export default chatsSlice.reducer;