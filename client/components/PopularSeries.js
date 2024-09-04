"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import tmdbConfigs from "@/config/tmdb.configs";
import mediaApi from "@/lib/media.api";
import routesGen from "@/lib/routesGen.js";

export default function PopularSeries({ mediaType, mediaCategory }) {
  const [medias, setMedias] = useState([]);
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const autoSlideInterval = useRef(null);

  useEffect(() => {
    const getMedias = async () => {
      const { response } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMedias(response.results);
    };

    getMedias();
  }, [mediaType, mediaCategory]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const startAutoSlide = () => {
    autoSlideInterval.current = setInterval(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += 2;
        if (
          scrollContainerRef.current.scrollLeft +
            scrollContainerRef.current.clientWidth >=
          scrollContainerRef.current.scrollWidth
        ) {
          scrollContainerRef.current.scrollLeft = 0;
        }
      }
    }, 30);
  };

  useEffect(() => {
    startAutoSlide();

    return () => clearInterval(autoSlideInterval.current);
  }, []);

  const handleMouseEnter = () => {
    clearInterval(autoSlideInterval.current);
  };

  const handleMouseLeave = () => {
    startAutoSlide();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold dark:text-white text-black mb-6">
        Popular Series
      </h2>
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-hidden scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
      >
        {medias.map((media) => (
          <Link
            key={media.id}
            href={
              mediaType !== "people"
                ? routesGen.mediaDetail(mediaType, media.mediaId || media.id)
                : routesGen.person(media.id)
            }
            className="flex-shrink-0 w-60"
          >
            <img
              src={tmdbConfigs.posterPath(
                media.poster_path ||
                  media.backdrop_path ||
                  media.mediaPoster ||
                  media.profile_path
              )}
              alt={media.title || media.name}
              className="w-full h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
            <div className="mt-2">
              <h3 className="text-lg font-semibold dark:text-white text-black">
                {media.title || media.name}
              </h3>
              <p className="dark:text-white text-black text-sm mt-1">
                Rating:{" "}
                {(Math.round(media.vote_average * 100) / 100).toFixed(1)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
