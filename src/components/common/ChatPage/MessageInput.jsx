import { send } from "@/lib/socket";
import React from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MessageInput = ({ msg, setMsg}) => {

    const name = useSelector((state) => state.msg.name);


  const onChangeMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendHandler();
    }
  };

  const sendHandler = () => {
    if (msg.length == 0) {
      toast.warn("Message cannot be empty");
      return;
    }
    send({ name, msg });
    setMsg("");
  };

  return (
    <div className="bg-white border-t p-4">
      <div className="max-w-3xl mx-auto flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onChange={onChangeMsg}
          onKeyDown={handleKeyDown}
          value={msg}
          autoFocus
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full transition-colors shadow-md hover:shadow-lg"
          onClick={sendHandler}
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
