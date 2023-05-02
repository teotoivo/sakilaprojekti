"use client";
"burgerMenu.tsx";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change as changeBurgerState } from "../../store/slices/burgerSlice";

export default function BurgerMenu() {
  const dispatch = useDispatch();
  const toggleMenu = () => {
    dispatch(changeBurgerState());
  };
  const burgerState = useSelector((state: any) => state.burger.state);
  return (
    <div className="h-full w-full flex absolute justify-end">
      <div
        className={`h-full w-1/3 bg-slate-600 ${
          burgerState ? "burgerOpen" : "burgerMenuDefault"
        }`}
      ></div>
    </div>
  );
}
