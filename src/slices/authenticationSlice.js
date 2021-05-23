import {createSlice} from '@reduxjs/toolkit'


const initialState = {isAuthenticated:true, isHirer: false, isAdmin:true}

const authenticationSlice = createSlice({
    name:'authentication',
    initialState,
    reducers:{}
})


export default authenticationSlice.reducer
