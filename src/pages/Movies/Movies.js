import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import css from './Movies.module.css';

const Movies = () => {
  const [movieInfo, setMovieInfo] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieId = searchParams.get('query') ?? '';

  useEffect(() => {
    if (movieId !== '') {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=290132a5d57bbb91972e407a10c60818&query=${movieId}`
      )
        .then(res => res.json())
        .then(obj => {
          setMovieInfo(obj.results);
        });
    }
  }, [movieId]);

  const handleSubmit = e => {
    e.preventDefault();
    const query = e.target.query.value;
    if (query === '') {
      return setSearchParams({});
    }
    setSearchParams({ query: query });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <input type="text" name="query" className={css.input} />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      <ul>
        {movieInfo.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`${movie.id}`}>{movie.original_title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Movies;
