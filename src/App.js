import { useEffect, useState } from "react";
import { Spin } from "antd";
import Loader from "./components/Loader";
import { useMovies } from "./useMovies";

import ErrorMessage from "./components/Main/ErrorMessage";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Navbar/Search";
import NumResults from "./components/Navbar/NumResults";
import Main from "./components/Main/Main";
import Box from "./components/Main/Box";
import MovieList from "./components/Main/MovieList";
import MovieDetails from "./components/Main/MovieDetails";
import WatchedSummary from "./components/Main/WatchedSummary";
import WatchedMoviesList from "./components/Main/WatchedMoviesList";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  // const storedValue = JSON.parse(localStorage.getItem("watched"));
  // const [watched, setWatched] = useState(storedValue || []);
  const [watched, setWatched] = useState(function () {
    const storedValue = JSON.parse(localStorage.getItem("watched"));
    return storedValue || [];
  });

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    //1. Each time the watched list state is updated, we will update the local storage

    // localStorage.setItem("watch", JSON.stringify([...watched, movie])); // Because state is updated in an asynchronous way, which means at this moment, watch state still holds the old value, so we have to push a new movie to the watch list the same way of setting state using setState function

    //2. Then each time the application loads (the app component first mounts), we will read that data from local storage and store it in to the watched state
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    //1. Each time the watched list state is updated, we will update the local storage
    localStorage.setItem("watched", JSON.stringify(watched));
    //because this effect here will only run after the watched movies have already been updated.
  }, [watched]);

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box isLoading={isLoading}>
          {isLoading && <Spin indicator={Loader} />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectedMovie}
              selectedId={selectedId}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
