import {configureStore} from '@reduxjs/toolkit';
import hotelReducer from '../reducer/hotelReducer';
import ticketReducer from '../reducer/ticketReducer';
import userReducer from '../reducer/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    ticket: ticketReducer,
    hotel: hotelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
