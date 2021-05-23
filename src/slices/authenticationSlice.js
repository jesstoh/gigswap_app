import {createSlice} from '@reduxjs/toolkit'


const initialState = {isAuthenticated:false, isHirer: false, isAdmin:false}

const authenticationSlice = createSlice({
    name:'authentication',
    initialState,
    reducers:{}
})


export default authenticationSlice.reducer
