import Hero from "../components/Hero";
import tmdbConfigs from "../config/tmdb.configs";

export default function Home() {
  return (
    <main>
      <Hero
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
    </main>
  );
}
