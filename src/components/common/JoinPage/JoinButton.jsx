import React from "react";
import { motion } from "framer-motion";

const JoinButton = ({ joinHandler }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-full font-semibold shadow-md transition-all"
      onClick={joinHandler}
    >
      Join Chat Room
    </motion.button>
  );
};

export default JoinButton;
