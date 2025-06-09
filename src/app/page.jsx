"use client";

import { connectSocket, disconnectSocket, send } from "@/lib/socket";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ScrollToBottom from "react-scroll-to-bottom";
import { FiSend, FiLogOut, FiUser, FiUsers, FiMessageSquare } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const [isjoin, setJoin] = useState(false);
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);

  const ms = useSelector((state) => state.msg.msgs);
  const members = useSelector((state) => state.msg.members);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMsgs(ms);
  }, [ms]);

  useEffect(() => {
    if (isjoin) {
      connectSocket(name);

      const handleUnload = () => {
        disconnectSocket(name);
      };

      window.addEventListener("beforeunload", handleUnload);
      window.addEventListener("pagehide", handleUnload);

      return () => {
        disconnectSocket(name);
        window.removeEventListener("beforeunload", handleUnload);
        window.removeEventListener("pagehide", handleUnload);
      };
    }
  }, [isjoin]);

  const onChangeHandler = (e) => {
    setName(e.target.value);
  };

  const onChangeMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendHandler();
    }
  };

  const joinhandleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      joinHandler();
    }
  };

  const joinHandler = () => {
    if (name.length == 0) {
      toast.warn("Please enter your name");
      return;
    }
    setJoin(true);
  };

  const leaveHandler = () => {
    disconnectSocket(name);
    setJoin(false);
    setName("");
    setMsg("");
    toast.info("You've left the chat");
  };

  const sendHandler = () => {
    if (msg.length == 0) {
      toast.warn("Message cannot be empty");
      return;
    }
    send({ name, msg });
    setMsg("");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {isjoin ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-screen flex flex-col bg-white shadow-xl max-w-6xl mx-auto overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FiMessageSquare className="text-xl" />
              <h1 className="text-xl font-bold">
                Chatting as <span className="text-indigo-200">{name}</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsMembersOpen(!isMembersOpen)}
                className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-all"
              >
                <FiUsers />
                <span>{members?.length || 0}</span>
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

          {/* Main Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Members sidebar */}
            <AnimatePresence>
              {isMembersOpen && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 250 }}
                  exit={{ width: 0 }}
                  className="bg-gray-50 border-r overflow-hidden"
                >
                  <div className="p-4 font-semibold text-gray-700 flex items-center">
                    <FiUsers className="mr-2" />
                    Online Members
                  </div>
                  <div className="overflow-y-auto h-full pb-20">
                    {members?.map((user, index) => (
                      <div key={index} className="flex items-center p-3 hover:bg-gray-100">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <FiUser />
                          </div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {user} {user === name && "(You)"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
              {/* Messages */}
              <ScrollToBottom 
                className="flex-grow overflow-y-auto p-4 bg-gradient-to-b from-white to-gray-50"
                scrollViewClassName="scrollbar-thin"
              >
                <div className="space-y-4 max-w-3xl mx-auto w-full">
                  <AnimatePresence>
                    {msgs.map((data, index) => {
                      if (data.name === name) {
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex justify-end"
                          >
                            <div className="max-w-xs md:max-w-md bg-indigo-600 text-white rounded-2xl rounded-tr-none p-4 shadow-md">
                              <div className="text-xs font-medium text-indigo-200">You</div>
                              <div className="mt-1">{data.msg}</div>
                            </div>
                          </motion.div>
                        );
                      } else if (data.name.length === 0) {
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-center"
                          >
                            <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              {data.msg}
                            </div>
                          </motion.div>
                        );
                      } else {
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex justify-start"
                          >
                            <div className="max-w-xs md:max-w-md bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
                              <div className="text-xs font-medium text-indigo-600">{data.name}</div>
                              <div className="mt-1 text-gray-800">{data.msg}</div>
                            </div>
                          </motion.div>
                        );
                      }
                    })}
                  </AnimatePresence>
                </div>
              </ScrollToBottom>

              {/* Input area */}
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
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-screen p-4"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMessageSquare className="text-indigo-600 text-3xl" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Chat</h1>
              <p className="text-gray-500">Connect with others in real-time</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center font-medium"
                  value={name}
                  onChange={onChangeHandler}
                  onKeyDown={joinhandleKeyDown}
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  * Please don't refresh after joining to stay connected
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-full font-semibold shadow-md transition-all"
                onClick={joinHandler}
              >
                Join Chat Room
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Page;