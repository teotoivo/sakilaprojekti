"use client";
"burgerMenu.tsx";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change as changeBurgerState } from "../../store/slices/burgerSlice";
import Link from "next/link";

async function getGenres(): Promise<Array<any>> {
  let res = await fetch("http://localhost:3000/api/db/categories");
  let data = await res.json();
  return data;
}

export default function BurgerMenu() {
  let [genres, setGenres] = useState<Array<any>>([]);
  useEffect(() => {
    getGenres().then((data) => {
      setGenres(data);
    });
  }, []);
  const burgerState = useSelector((state: any) => state.burger.state);
  return (
    <div className="h-full w-full flex absolute justify-end">
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
              <button className="text-md">Movies</button>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            {genres.map((genre) => {
              return (
                <li key={genre.id}>
                  <Link className="text-sm" href={`/genre/${genre.id}`}>
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
