import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=290132a5d57bbb91972e407a10c60818`
    )
      .then(res => res.json())
      .then(obj => {
        setReviews(obj.results);
      });
  }, [movieId]);

  return (
    <>
      {reviews &&
        reviews.map(review => {
          return (
            <div className={css.reviews} key={review.id}>
              <h2>{review.author} : </h2>
              <p>{review.content}</p>
            </div>
          );
        })}
      {reviews.length === 0 && (
        <div>We don't have any reviews for this movie</div>
      )}
    </>
  );
};

export default Reviews;
