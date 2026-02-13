import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state,action) =>{
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) =>{
            state.status = false;
            state.userData = null;
        }
    }
});

// One Imporvement is to make Slice for Post too like state.allPosts, state.currentPost etc. 

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;