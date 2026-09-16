"use client";

import { useEffect, useState } from "react";

type Joke = {
  id: string;
  joke: string;
};

const FAVORITES_KEY = "chuckle-fetch-favorites";

export default function Home() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Joke[]>([]);

  // Load favorites from localStorage on first render
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  // Fetch an initial joke on load
  useEffect(() => {
    fetchJoke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persistFavorites(next: Joke[]) {
    setFavorites(next);
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    } catch {
      // ignore storage failures (e.g. private browsing)
    }
  }

  async function fetchJoke() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setJoke({ id: data.id, joke: data.joke });
    } catch (err) {
      setError("Couldn't fetch a joke right now. Try again?");
    } finally {
      setLoading(false);
    }
  }

  function isFavorited(j: Joke) {
    return favorites.some((f) => f.id === j.id);
  }

  function toggleFavorite(j: Joke) {
    if (isFavorited(j)) {
      persistFavorites(favorites.filter((f) => f.id !== j.id));
    } else {
      persistFavorites([j, ...favorites]);
    }
  }

  function removeFavorite(id: string) {
    persistFavorites(favorites.filter((f) => f.id !== id));
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">😂 Chuckle Fetch</h1>
      <p className="mt-2 text-center text-slate-500">
        A tiny test app — fetches a random dad joke from a public API and lets
        you save favorites locally.
      </p>

      <div className="mt-10 w-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        {loading && <p className="text-lg text-slate-400">Loading a joke…</p>}
        {!loading && error && <p className="text-lg text-red-500">{error}</p>}
        {!loading && !error && joke && (
          <p className="text-xl leading-relaxed">{joke.joke}</p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={fetchJoke}
            disabled={loading}
            className="rounded-lg bg-slate-800 px-4 py-2 font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Fetching…" : "Get another joke"}
          </button>
          {joke && (
            <button
              onClick={() => toggleFavorite(joke)}
              className="rounded-lg border border-slate-300 px-4 py-2 font-medium transition hover:bg-slate-50"
            >
              {isFavorited(joke) ? "★ Saved" : "☆ Save favorite"}
            </button>
          )}
        </div>
      </div>

      <section className="mt-12 w-full">
        <h2 className="text-lg font-semibold text-slate-700">
          Favorites ({favorites.length})
        </h2>
        {favorites.length === 0 ? (
          <p className="mt-2 text-slate-400">
            No favorites saved yet — click the star on a joke you like.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {favorites.map((f) => (
              <li
                key={f.id}
                className="flex items-start justify-between gap-4 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200"
              >
                <span>{f.joke}</span>
                <button
                  onClick={() => removeFavorite(f.id)}
                  className="shrink-0 text-sm text-slate-400 hover:text-red-500"
                  aria-label="Remove favorite"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
