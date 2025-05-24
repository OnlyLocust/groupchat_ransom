"use client";

import { connectSocket, disconnectSocket, send } from "@/lib/socket";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const [isjoin, setJoin] = useState(false);
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [msgs, setMsgs] = useState([]);

  const ms = useSelector((state) => state.msg.msgs);
  const members = useSelector((state) => state.msg.members)

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
    }
  }
  }, [isjoin]);

  const onChangeHandler = (e) => {
    setName(e.target.value);
  };

  const onChangeMsg = (e) => {
    setMsg(e.target.value);
  };

  const joinHandler = () => {
    setJoin(true);
  };

  const sendHandler = () => {
    send({ name, msg });
    // dispatch(setMsgStore({name,msg}))
    setMsg("");
  };

  return (
    <>
      {isjoin ? (
        <div className="h-screen flex flex-col">
          <div className="text-4xl font-bold p-4 flex justify-between">
            <div>Welcome <span className="text-red-600">{name}</span></div>
            <div>Online : {members.length}</div>
          </div>
          <div  className="border p-2 flex text-lg">
            <div className="px-4 font-bold">Online: </div>
            <div className="  flex overflow-x-scroll hide-scrollbar w-full gap-1">
            {
              members.map((user,index) => {
                return (<div className="bg-gray-400 text-white font-bold  rounded px-3" key={index}>{user}</div>)
              })
            }
          </div>
          </div>

          {/* Chats section that takes up remaining space */}
          <div className="flex-grow overflow-y-auto p-4 border">
            {msgs.map((data, index) => {
              if (data.name == name) {
                return (
                  <div key={index} className=" p-1">
                    <div className="w-1/2 border rounded m-1 flex flex-col justify-self-end text-right">
                      <div className="bg-green-400 p-1">You</div>
                      <div className="p-1">{data.msg}</div>
                    </div>
                  </div>
                );
              } else if (data.name.length == 0) {
                return (
                  <div
                    className="flex items-center justify-center text-blue-300 m-1"
                    key={index}
                  >
                    {data.msg}
                  </div>
                );
              } else {
                return (
                  <div key={index} className=" p-1">
                    <div className="w-1/2 border rounded m-1 flex flex-col justify-self-start text-left">
                      <div className="bg-gray-400 p-1">{data.name}</div>
                      <div className="p-1">{data.msg}</div>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {/* Input section at the bottom */}
          <div className="p-4 flex gap-2 border-t">
            <input
              type="text"
              placeholder="enter message"
              className="border flex-1 p-2"
              onChange={onChangeMsg}
              value={msg}
            />
            <button
              className="border text-white bg-green-400 px-4 py-2"
              onClick={sendHandler}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-screen flex-col w-1/2 m-auto  justify-center items-center">
          <div className="text-4xl font-bold text-center m-3">
            Come to chat room
          </div>
          <input
            type="text"
            placeholder="Enter your name "
            className="text-lg text-center font-bold border rounded w-full m-3"
            value={name}
            onChange={onChangeHandler}
          />
          <p className="text-red-500">
            * Do not refresh the page after joining the room , otherwise you
            will be disconnected
          </p>
          <button
            className="bg-blue-600 text-white hover:bg-blue-500 w-1/2 m-8 py-1 text-lg rounded"
            onClick={joinHandler}
          >
            join
          </button>
        </div>
      )}
    </>
  );
};

export default Page;
