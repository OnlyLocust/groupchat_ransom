import {  AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import MyMessage from "./MyMessage";
import FriendMessage from "./FriendMessage";
import Notification from "./Notification";

const MessageArea = () => {
  const [msgs, setMsgs] = useState([]);
  const ms = useSelector((state) => state.msg.msgs);
    const name = useSelector((state) => state.msg.name);
  

  useEffect(() => {
    setMsgs(ms);
  }, [ms]);
  return (
    <ScrollToBottom
      className="flex-grow overflow-y-auto p-4 bg-gradient-to-b from-white to-gray-50"
      scrollViewClassName="scrollbar-thin"
    >
      <div className="space-y-4 max-w-3xl mx-auto w-full">
        <AnimatePresence>
          {msgs.map((data, index) => {
            if (data.name === name) {
              return <MyMessage msg={data.msg} key={index} />;
            } else if (data.name.length === 0) {
              return <Notification msg={data.msg} key={index} />;
            } else {
              return <FriendMessage name={data.name} msg={data.msg} key={index} />;
            }
          })}
        </AnimatePresence>
      </div>
    </ScrollToBottom>
  );
};

export default MessageArea;
