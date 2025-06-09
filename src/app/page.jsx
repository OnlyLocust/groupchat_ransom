"use client";

import { connectSocket, disconnectSocket, send } from "@/lib/socket";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import JoinPage from "@/components/pages/JoinPage";
import ChatPage from "@/components/pages/ChatPage";

const Page = () => {

  const name = useSelector((state) => state.msg.name);
  const isjoin = useSelector((state) => state.msg.isjoin);

  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);



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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {isjoin ? <ChatPage  /> : <JoinPage />}
    </div>
  );
};

export default Page;
