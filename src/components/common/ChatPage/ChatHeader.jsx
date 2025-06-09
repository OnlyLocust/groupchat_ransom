import { setJoin, setName } from "@/lib/msgSlice";
import { disconnectSocket } from "@/lib/socket";
import React from "react";
import { FiLogOut, FiMessageSquare, FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ChatHeader = ({
  memberLength,
  isMembersOpen,
  setMsg,
  setIsMembersOpen,
}) => {

    const dispatch = useDispatch()
      const name = useSelector((state) => state.msg.name);


  const leaveHandler = () => {
    disconnectSocket(name);
    dispatch(setJoin(false))
    dispatch(setName());
    setMsg("");
    toast.info("You've left the chat");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <FiMessageSquare className="text-xl" />
        <h1 className="text-xl font-bold">
          Chatting as{" "}
          <span className="text-indigo-200">{name || "Loading..."}</span>
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsMembersOpen(!isMembersOpen)}
          className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-all"
        >
          <FiUsers />
          <span>{memberLength}</span>
        </button>
        <button
          onClick={leaveHandler}
          className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-all"
        >
          <FiLogOut />
          <span>Leave</span>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
