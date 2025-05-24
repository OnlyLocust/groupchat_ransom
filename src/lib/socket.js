import { io } from "socket.io-client";
import { store } from "./store";
import { setMembers, setMsgStore } from "./msgSlice";
let socket;

export const connectSocket = (name) => {
  socket = io("https://ransom-6c1r.onrender.com", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
      socket.emit('join', name)
    });

     socket.on('welcome' , (name) => {
    store.dispatch(setMsgStore({name:'' , msg:`${name} joined the chat`}))   
})

  socket.on('recv', ({name,msg}) => {
    store.dispatch(setMsgStore({name , msg}))
    
  })

  socket.on('all', (user) => {
    store.dispatch(setMembers(user))
  })

  socket.on('leaving' , (name) => {
    store.dispatch(setMsgStore({name:'' , msg:`${name} leaved the chat`}))
  })
    

  socket.on("connect_error", (err) => {
    console.error("❌ Connection Error:", err);
  });
};

export const disconnectSocket = (name) => {
  if (socket?.connected) {
    socket.emit('leave' , name)
    socket.disconnect()
  }
};

export const send = ({name,msg}) => {
  if(socket?.connected){
    socket.emit('send' , {name,msg})
  }
}