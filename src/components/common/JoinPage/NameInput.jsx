import { setName } from "@/lib/msgSlice";
import React from "react";
import { useDispatch } from "react-redux";

const NameInput = ({ name, joinhandleKeyDown }) => {
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    dispatch(setName(e.target.value));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Your name"
        className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center font-medium"
        value={name}
        onChange={onChangeHandler}
        onKeyDown={joinhandleKeyDown}
        autoFocus
      />
      <p className="text-xs text-gray-500 mt-2 text-center">
        * Please don't refresh after joining to stay connected
      </p>
    </div>
  );
};

export default NameInput;
