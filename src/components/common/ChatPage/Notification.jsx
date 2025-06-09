import { motion } from "framer-motion";
import React from "react";

const Notification = ({ msg }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center"
    >
      <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
        {msg}
      </div>
    </motion.div>
  );
};

export default Notification;
