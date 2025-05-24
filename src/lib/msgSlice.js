  import { createSlice } from '@reduxjs/toolkit';

  const msgSlice = createSlice({
    name: 'msg',
    initialState: {
      msgs: [],
      members:[]
    },
    reducers: {
      setMsgStore: (state, action) => {
        state.msgs = [...state.msgs, action.payload];

      },
      setMembers: (state , action) => {
        state.members = action.payload
      }
    },
  });

  export const { setMsgStore , setMembers} = msgSlice.actions;
  export default msgSlice.reducer;
