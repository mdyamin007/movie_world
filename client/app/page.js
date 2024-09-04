import PopularMovies from "@/components/PopularMovies";
import PopularSeries from "@/components/PopularSeries";
import Hero from "../components/Hero";
import tmdbConfigs from "../config/tmdb.configs";

/**
 * Home component for the landing page.
 *
 * This component renders:
 * - A Hero section displaying a featured media element (e.g., a movie or TV show).
 * - A section for popular movies.
 * - A section for popular TV series.
 *
 * It uses configurations from `tmdbConfigs` to specify the media types and categories.
 *
 * @returns {JSX.Element} The rendered Home component.
 */

export default function Home() {
  return (
    <main>
      <Hero
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
      <PopularMovies
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
      <PopularSeries
        mediaType={tmdbConfigs.mediaType.tv}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
    </main>
  );
}
