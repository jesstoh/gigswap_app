import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


const initialState = {
    categories: null,
    subcategories: null,
}


const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers:{

    }
})


export default categoriesSlice.reducer;