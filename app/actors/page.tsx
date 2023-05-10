"use client";
import { Waypoint } from "react-waypoint";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type actor = {
  first_name: string;
  last_name: string;
  actor_id: number;
};

export default function Page() {
  const [actors, setActors] = useState<Array<actor>>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const url = `http://localhost:3000/api/db/actors?page=0`;

    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setActors(data);
        });
    } catch (e: any) {
      console.error(e.message);
    }
  }, []);

  async function loadMore() {
    const url = `http://localhost:3000/api/db/actors?page=${page}`;

    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setActors([...actors, ...data]);
        });
      setPage(page + 1);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  return (
    <div className="flex flex-wrap gap-4 ">
      {actors.map((actor: actor) => {
        return (
          <Link
            href={`/movies?actor=${actor.actor_id}`}
            key={actor.first_name}
            className="rounded-lg p-3 font-header w-1/5 bg-sak-blue"
          >
            <h1>{actor.first_name + " " + actor.last_name}</h1>
          </Link>
        );
      })}
      <Waypoint
        onEnter={() => {
          loadMore();
        }}
      />
    </div>
  );
}
