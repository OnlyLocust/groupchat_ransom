  import { createSlice } from '@reduxjs/toolkit';

  const msgSlice = createSlice({
    name: 'msg',
    initialState: {
      isjoin:false,
      name:"",
      msgs: [],
      members:[]
    },
    reducers: {
      setMsgStore: (state, action) => {
        state.msgs = [...state.msgs, action.payload];

      },
      setMembers: (state , action) => {
        state.members = action.payload
      },
      setName:(state,action) => {
        state.name = action.payload || ""
      },
      leave:(state) => {
        state.isjoin = false
        state.name = ""
        state.msgs = []
        state.members = []
        
      },
      setJoin:(state, action) => {
        state.isjoin = action.payload
      }
    },
  });

  export const { setMsgStore , setMembers, setName , leave, setJoin} = msgSlice.actions;
  export default msgSlice.reducer;
