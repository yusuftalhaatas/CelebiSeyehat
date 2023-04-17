import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {user} from '../../types/user';

const initialState: user = {
  userName: '',
  name: '',
  puan: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPuan: (state, action: PayloadAction<number>) => {
      state.puan = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const {setName, setPuan, setUserName} = userSlice.actions;

export default userSlice.reducer;
