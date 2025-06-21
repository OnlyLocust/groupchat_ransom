import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FiUser, FiUsers, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";

const SideUser = ({ isMembersOpen, members, setIsMembersOpen }) => {
  const name = useSelector((state) => state.msg.name);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AnimatePresence>
      {isMembersOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween" }}
          className={`${
            mobileView
              ? "fixed top-0 left-0 w-screen h-full z-50"
              : "w-[250px] h-full border-r"
          } bg-gray-50 overflow-hidden`}
        >
          {/* Header */}
          <div className="p-4 font-semibold text-gray-700 flex items-center justify-between border-b">
            <div className="flex items-center">
              <FiUsers className="mr-2" />
              Online Members
            </div>

            {/* Close button - only visible on mobile */}
            {mobileView && (
              <button
                onClick={() => setIsMembersOpen(false)}
                className="md:hidden text-gray-600 hover:text-red-500"
              >
                <FiX size={20} />
              </button>
            )}
          </div>

          {/* Member List */}
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
