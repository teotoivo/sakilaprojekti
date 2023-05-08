"use client";
"burgerMenu.tsx";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change as changeBurgerState } from "../../store/slices/burgerSlice";
import Link from "next/link";
//uudi
import { v4 as uuidv4 } from "uuid";

async function getGenres(): Promise<Array<any>> {
  let res = await fetch("http://localhost:3000/api/db/categories");
  let data = await res.json();
  return data;
}

export default function BurgerMenu() {
  const [z, setZ] = useState("");
  let [genres, setGenres] = useState<Array<any>>([]);
  useEffect(() => {
    getGenres().then((data) => {
      setGenres(data);
    });
  }, []);

  const [showGenres, setShowGenres] = useState(false);
  const burgerState = useSelector((state: any) => state.burger.state);
  useEffect(() => {
    if (!burgerState) {
      setShowGenres(false);
    }
  }, [burgerState]);
  useEffect(() => {
    if (burgerState) {
      setZ("");
    } else {
      setTimeout(() => {
        if (burgerState) return;
        setZ("-z-10");
      }, 300);
    }
  }, [burgerState]);
  return (
    <div className={`${z} h-full w-full flex absolute justify-end`}>
      <div
        className={`h-full min-w-burger px-4 shadow-lg bg-white ${
          burgerState ? "burgerOpen" : "burgerMenuDefault"
        }`}
      >
        <div className="h-[63px] flex items-center">
          <p className="font-bold text-lg">Menu</p>
        </div>
        <div>
          <ul>
            <li>
              <div>
                <button
                  onClick={() => {
                    setShowGenres(!showGenres);
                  }}
                  className={`text-md duration-100 ${
                    !showGenres ? "" : "rotate-90"
                  }`}
                >
                  {">"}
                </button>
                <Link href={"/movies"} className="text-md">
                  Movies
                </Link>
              </div>
              <div>
                <Link href={"/actors"} className="text-md">
                  Actors
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className={`${!showGenres ? "hidden" : ""}`}>
          <ul>
            {genres.map((genre) => {
              return (
                <li key={uuidv4()}>
                  <Link
                    className="text-sm"
                    href={`movies?category=${genre.name}`}
                  >
                    {genre.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
