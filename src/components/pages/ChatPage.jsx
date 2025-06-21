import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import MessageInput from "../common/ChatPage/MessageInput";
import SideUser from "../common/ChatPage/SideUser";
import ChatHeader from "../common/ChatPage/ChatHeader";
import { useSelector } from "react-redux";
import MessageArea from "../common/ChatPage/MessageArea";
import { sendHeartBeat } from "@/lib/socket";

const ChatPage = () => {
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const name = useSelector((state) => state.msg.name)

  const members = useSelector((state) => state.msg.members);

  useEffect(() => {
    const interval = setInterval(() => {
      sendHeartBeat(name)
    }, 30 * 1000); // every 30s

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen flex flex-col bg-white shadow-xl max-w-6xl mx-auto overflow-hidden"
    >
      <ChatHeader
        isMembersOpen={isMembersOpen}
        setIsMembersOpen={setIsMembersOpen}
        memberLength={members?.length || 0}
        setMsg={setMsg}
      />

      <div className="flex flex-1 overflow-hidden">
        <SideUser isMembersOpen={isMembersOpen} members={members} setIsMembersOpen={setIsMembersOpen}/>

        <div className="flex-1 flex flex-col">
          <MessageArea />

          <MessageInput msg={msg} setMsg={setMsg} />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPage;
