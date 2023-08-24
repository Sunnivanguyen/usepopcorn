import { MdOutlineDeleteForever } from "react-icons/md";

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <MdOutlineDeleteForever
          onClick={() => onDeleteWatched(movie.imdbID)}
          className="btn-delete"
        />
      </div>
    </li>
  );
}

export default WatchedMovie;
