import {motion, AnimatePresence } from "framer-motion";
import React from "react";
import { FiUser, FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";

const SideUser = ({isMembersOpen, members}) => {

    const name = useSelector((state) => state.msg.name);


  return (
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
              <div
                key={index}
                className="flex items-center p-3 hover:bg-gray-100"
              >
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
  );
};

export default SideUser;
