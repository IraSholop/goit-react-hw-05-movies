import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=290132a5d57bbb91972e407a10c60818'
    )
      .then(res => res.json())
      .then(obj => {
        setMovies(obj.results);
      });
  }, []);

  return (
    <>
      <h1 className={css.trend}>Trending today</h1>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id} className={css.listmovie}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.original_title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
