"use client";
import { Waypoint } from "react-waypoint";
import React, { useEffect, useState } from "react";

type movie = {
  description: string;
  film_id: number;
  length: number;
  rating: string;
  release_year: number;
  special_features: string;
  title: string;
};

export default function Page() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/db/movies?page=1")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);
  return (
    <div className="flex flex-wrap gap-4">
      {movies.map((movie: movie) => {
        return (
          <div key={movie.title} className="w-52 bg-slate-400 rounded-lg p-3">
            <h1>{movie.title}</h1>
            <div className="text-sm">
              <p>Rating: {movie.rating}</p>
              <p>Release year: {movie.release_year}</p>
              <p>Length: {movie.length}</p>
              <p>Description: {movie.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
