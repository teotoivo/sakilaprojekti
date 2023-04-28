"use client";

import React from "react";
import { atom, useAtom } from "jotai";

const isMenuOpenAtom = atom(false);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom);
  return (
    <header className="p-4 flex flex-row w-full bg-slate-500">
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-1 h-full items-center">
          <p>sakila oy {isMenuOpen}</p>
        </div>
        <div className="flex-1 flex flex-row justify-end">
          <div
            className=""
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <div className={`bar1 ${isMenuOpen ? "baropen1" : ""}`}></div>
            <div
              className={`bar2 ${isMenuOpen ? "baropenTransparent" : ""}`}
            ></div>
            <div className={`bar3 ${isMenuOpen ? "baropen3" : ""}`}></div>
          </div>
        </div>
      </div>
    </header>
  );
}
