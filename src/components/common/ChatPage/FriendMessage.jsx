import React from "react";
import { motion } from "framer-motion";

const FriendMessage = ({ name, msg }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex justify-start"
    >
      <div className="max-w-xs md:max-w-md bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
        <div className="text-xs font-medium text-indigo-600">{name}</div>
        <div className="mt-1 text-gray-800">{msg}</div>
      </div>
    </motion.div>
  );
};

export default FriendMessage;
