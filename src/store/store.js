import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authslice";
import rootSlice from "./root/rootSlice";
 
 const store = configureStore({
     reducer: {
         auth: authSlice,
         root: rootSlice
     }
 });
 
 export default store;