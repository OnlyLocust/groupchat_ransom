import { io } from "socket.io-client";
import { store } from "./store";
import dotenv from 'dotenv'
dotenv.config({path:'./../../.env'})
import { leave, setMembers, setMsgStore } from "./msgSlice";
let socket;

// const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000/'
const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || ''

export const connectSocket = (name) => {
  console.log(socketUrl );
  
  socket = io(socketUrl, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    socket.emit("join", name);
  });

  socket.on("welcome", (name) => {
    store.dispatch(setMsgStore({ name: "", msg: `${name} joined the chat` }));
  });

  socket.on('duplicate' , () => {
    store.dispatch(leave())
  })

  socket.on("recv", ({ name, msg }) => {
    store.dispatch(setMsgStore({ name, msg }));
  });

  socket.on("all", (user) => {
    store.dispatch(setMembers(user));
  });

  socket.on("leaving", (name) => {

    const me = store.getState((state) => state.msg.name)
    if(name === me) store.dispatch(leave())
    store.dispatch(setMsgStore({ name: "", msg: `${name} leaved the chat` }));
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Connection Error:", err);
  });
};

export const disconnectSocket = (name) => {
  if (socket?.connected) {
    socket.emit("leave", name);
    socket.disconnect();
  }
};

export const send = ({ name, msg }) => {
  if (socket?.connected) {
    socket.emit("send", { name, msg });
  }
};

export const sendHeartBeat = (name) => {
  if (socket?.connected) {
    socket.emit("heartbeat", name); // replace with actual user name
  }
};
