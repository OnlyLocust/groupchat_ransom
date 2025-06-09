import React from "react";
import { FiMessageSquare } from "react-icons/fi";

const Welcome = () => {
  return (
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiMessageSquare className="text-indigo-600 text-3xl" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Chat</h1>
      <p className="text-gray-500">Connect with others in real-time</p>
    </div>
  );
};

export default Welcome;
