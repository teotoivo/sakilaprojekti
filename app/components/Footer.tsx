"use client";
import React, { useState, useEffect } from "react";

async function getStores() {
  const url = `http://localhost:3000/api/db/stores`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export default function Footer() {
  //add sakila oy copyright
  const [stores, setStores] = useState<Array<any>>([]);

  useEffect(() => {
    getStores().then((data) => {
      setStores(data);
    });
  }, []);

  return (
    <footer className="w-full bg-sak-red flex flex-col p-4 items-center justify-center">
      <div className="text-white font-header">sakila oy</div>
      <div className="text-white font-header">
        {stores.map((store) => {
          return (
            <div key={store.store_id}>
              {store.address}, {store.city}
            </div>
          );
        })}
      </div>
    </footer>
  );
}
