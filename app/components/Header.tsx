"use client";
"header.tsx";

import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change as changeBurgerState } from "../../store/slices/burgerSlice";

export default function Header() {
  const dispatch = useDispatch();
  const toggleMenu = () => {
    dispatch(changeBurgerState());
  };
  const burgerState = useSelector((state: any) => state.burger.state);
  return (
    <header className="p-4 flex flex-row w-full bg-slate-500">
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-1 h-full items-center">
          <p>sakila oy {burgerState}</p>
        </div>
        <div className="flex-1 flex flex-row justify-end z-50">
          <div
            className=""
            onClick={() => {
              toggleMenu();
            }}
          >
            <div className={`bar1 ${burgerState ? "baropen1" : ""}`}></div>
            <div
              className={`bar2 ${burgerState ? "baropenTransparent" : ""}`}
            ></div>
            <div className={`bar3 ${burgerState ? "baropen3" : ""}`}></div>
          </div>
        </div>
      </div>
    </header>
  );
}
