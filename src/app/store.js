import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../Features/userSlice';

export default configureStore({
  reducer: {
    userDetails: UserReducer,
  },
});
