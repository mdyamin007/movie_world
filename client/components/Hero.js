"use client";

import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import mediaApi from "../lib/media.api";
import genreApi from "../lib/genre.api";
import tmdbConfigs from "../config/tmdb.configs";
import Image from "next/image";

export default function Hero({ mediaType, mediaCategory }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMovies(response.results);
    };

    const getGenres = async () => {
      const { response, err } = await genreApi.getList({ mediaType });

      if (response) {
        setGenres(response.genres);
        getMedias();
      }
    };

    getGenres();
  }, [mediaType, mediaCategory]);

  // console.log(movies);
  // console.log(genres);

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[32rem]">
      <Carousel pauseOnHover slideInterval={3000}>
        {movies &&
          movies.map((movie, index) => (
            <div className="relative h-full w-full" key={index}>
              <img
                src={tmdbConfigs.backdropPath(
                  movie.backdrop_path || movie.poster_path
                )}
                alt={movie.title || movie.name}
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4">
                <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold">
                  {movie.title || movie.name}
                </h2>
                <div className="flex space-x-2 mt-4">
                  {[...movie.genre_ids].splice(0, 2).map((genreId, index) => (
                    <span
                      key={index}
                      className="bg-blue-500 text-white text-sm px-2 py-1 rounded"
                    >
                      {genres.find((e) => e.id === genreId)?.name}
                    </span>
                  ))}
                </div>
                <p className="text-white text-sm md:text-base lg:text-lg mt-4">
                  {movie.overview}
                </p>
                <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-blue-800 transition">
                  Watch Now
                </button>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}
