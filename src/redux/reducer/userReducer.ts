import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {user, ticket} from '../../types/user';

const initialState: user = {
  name: '',
  id: '',
  puan: 0,
  tickets: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setPuan: (state, action: PayloadAction<number>) => {
      state.puan = action.payload;
    },
    setTickets: (state, action: PayloadAction<Array<ticket>>) => {
      state.tickets = action.payload;
    },
  },
});

export const {setName, setId, setPuan, setTickets} = userSlice.actions;

export default userSlice.reducer;
