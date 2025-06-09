import React from "react";
import { motion } from "framer-motion";

const MyMessage = ({msg}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex justify-end"
    >
      <div className="max-w-xs md:max-w-md bg-indigo-600 text-white rounded-2xl rounded-tr-none p-4 shadow-md">
        <div className="text-xs font-medium text-indigo-200">You</div>
        <div className="mt-1">{msg}</div>
      </div>
    </motion.div>
  );
};

export default MyMessage;
