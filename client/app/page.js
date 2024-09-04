import PopularMovies from "@/components/PopularMovies";
import PopularSeries from "@/components/PopularSeries";
import Hero from "../components/Hero";
import tmdbConfigs from "../config/tmdb.configs";

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
