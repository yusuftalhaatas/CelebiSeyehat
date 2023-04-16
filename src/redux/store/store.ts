import {configureStore} from '@reduxjs/toolkit';
import agencyReducer from '../reducer/agencyReducer';
import userReducer from '../reducer/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    agency: agencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
