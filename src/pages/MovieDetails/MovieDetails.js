import { useRef, useEffect, useState, Suspense } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const location = useLocation();
  const linkLocation = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=290132a5d57bbb91972e407a10c60818`
    )
      .then(res => res.json())
      .then(obj => {
        setMovieInfo(obj);
      });
  }, [movieId]);

  return (
    <>
      <Link to={linkLocation.current} className={css.back}>
        Back
      </Link>
      <div className={css.movie}>
        <img
          src={
            movieInfo['backdrop_path']
              ? `https://image.tmdb.org/t/p/original${movieInfo['backdrop_path']}`
              : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'
          }
          alt={movieInfo.title}
        />
        <div className={css.movieinfo}>
          <h1>{movieInfo.original_title}</h1>
          <h2>{movieInfo.vote_average}</h2>
          <h2>Overview</h2>
          <p>{movieInfo.overview}</p>
          <h2>Genres</h2>
          {movieInfo.genres?.map(genre => genre.name).join(', ')}
        </div>
      </div>
      <hr />
      <h2 className={css.title}>Additional information</h2>
      <ul className={css.listadd}>
        <li className={css.itemadd}>
          <Link to="cast">Cast</Link>
        </li>
        <li className={css.itemadd}>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <hr />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
