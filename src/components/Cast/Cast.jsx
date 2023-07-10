import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=290132a5d57bbb91972e407a10c60818`
    )
      .then(res => res.json())
      .then(obj => {
        setCast(obj.cast);
      });
  }, [movieId]);

  return (
    <ul>
      {cast.map(actor => {
        return (
          <li key={actor.id} className={css.actor}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                  : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'
              }
              alt={actor.name}
              className={css.imgactor}
            />
            <h2>{actor.name}</h2>
            <h3>Character: {actor.character}</h3>
          </li>
        );
      })}
    </ul>
  );
};

export default Cast;
