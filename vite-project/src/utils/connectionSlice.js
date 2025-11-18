import { createSlice } from "@reduxjs/toolkit";


const ConnectionSlice=createSlice({
    name:'connection',
    initialState:[],
    reducers:{
        addConnection:(state,action)=>{
            return action.payload;
        },
        removeConnection:()=>{
            return [];
        }
    }
})

export default ConnectionSlice.reducer;

export const {addConnection,removeConnection}=ConnectionSlice.actions;