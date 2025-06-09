import React from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import JoinButton from "../common/JoinPage/JoinButton";
import NameInput from "../common/JoinPage/NameInput";
import Welcome from "../common/JoinPage/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { setJoin } from "@/lib/msgSlice";

const JoinPage = () => {
  const name = useSelector((state) => state.msg.name);
  const dispatch = useDispatch();


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
    dispatch(setJoin(true));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <Welcome />

        <div className="space-y-6">
          <NameInput  name={name} joinhandleKeyDown={joinhandleKeyDown} />

          <JoinButton joinHandler={joinHandler} />
        </div>
      </div>
    </motion.div>
  );
};

export default JoinPage;
