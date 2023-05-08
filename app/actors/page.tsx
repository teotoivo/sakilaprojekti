"use client";
import { Waypoint } from "react-waypoint";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type movie = {
  description: string;
  film_id: number;
  length: number;
  rating: string;
  release_year: number;
  special_features: string;
  title: string;
  actor_names: string;
  category: string;
};

export default function Page() {
  const [actors, setActors] = useState<Array<movie>>([]);
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
    <div className="flex flex-wrap gap-4">
      {actors.map((movie: movie) => {
        return (
          <div key={movie.title} className="w-52 bg-slate-400 rounded-lg p-3">
            <h1>{movie.title}</h1>
            <div className="text-sm">
              <p>Rating: {movie.rating}</p>
              <p>Release year: {movie.release_year}</p>
              <p>Length: {movie.length}</p>
              <p>Description: {movie.description}</p>
              <p>Category: {movie.category}</p>
              <p>Actor: {movie.actor_names}</p>
            </div>
          </div>
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
