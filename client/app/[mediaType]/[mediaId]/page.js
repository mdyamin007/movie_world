import { Button } from "flowbite-react";
import mediaApi from "@/lib/media.api";
import tmdbConfigs from "@/config/tmdb.configs";

// Convert the component to an async function to fetch data on the server
export default async function Page({ params }) {
  const { mediaType, mediaId } = params;

  // Fetch media details from the API
  const { response, err } = await mediaApi.getDetail({
    mediaType,
    mediaId,
  });

  if (err) {
    throw new Error(err.message);
  }

  const media = response;
  const genres = response.genres.splice(0, 2);
  const isFavorite = response.isFavorite;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap md:flex-nowrap gap-8">
        <div className="md:w-1/2 w-full">
          <img
            src={tmdbConfigs.backdropPath(
              media.backdrop_path || media.poster_path
            )}
            alt="Additional Movie Image"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="md:w-1/2 w-full">
          <div className="relative w-full pb-[56.25%] mb-4">
            <iframe
              src={tmdbConfigs.youtubePath(media.videos.results[0].key)}
              title="Trailer Video"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            ></iframe>
          </div>

          <div className="dark:text-white text-black mt-4">
            <h2 className="text-3xl font-bold mb-4">{`${
              media.title || media.name
            } ${
              mediaType === tmdbConfigs.mediaType.movie
                ? media.release_date.split("-")[0]
                : media.first_air_date.split("-")[0]
            }`}</h2>
            <p className="mb-6">{media.overview}</p>

            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-semibold">
                Rating:{" "}
                {(Math.round(media.vote_average * 100) / 100).toFixed(1)}
              </span>
              <Button className="flex items-center text-white bg-transparent border-none shadow-none focus:outline-none hover:text-blue-700">
                Rate Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold dark:text-white text-black mb-4">
          Cast
        </h3>
        <div className="flex flex-wrap gap-4">
          {media.credits.cast.map((castMember) => (
            <div key={castMember.id} className="my-10 w-32 h-32 text-center">
              <img
                src={tmdbConfigs.posterPath(castMember.profile_path)}
                alt={castMember.name}
                className="rounded-full w-32 h-32 object-cover shadow-lg"
              />
              <p className="mt-2 dark:text-white text-black font-semibold">
                {castMember.name}
              </p>
              <p className="dark:text-white text-black text-sm">
                {castMember.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
