import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  chatId: 'jesstoh23-kenning',
  hirer: '',
  talent: '',
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    // Setting active chatId, talent & hirer in chat room
    setChatRoom: {
      reducer(state, action) {
        state.chatId = action.payload.chatId;
        state.hirer = action.payload.hirer;
        state.talent = action.payload.talent;
      },
      prepare(chatId, hirer, talent) {
        return {
          payload: {
            chatId,
            hirer,
            talent,
          },
        };
      },
    },
  },
});

export const { setChatRoom } = chatsSlice.actions;

export default chatsSlice.reducer;
