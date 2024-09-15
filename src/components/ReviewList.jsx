import { useState } from "react";
import { useReviews, useReviewsDispatch } from "./ReviewsContext";
import Rating from "./Rating";

export default function ReviewList() {
  const reviews = useReviews();

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <Review review={review} />
        </li>
      ))}
    </ul>
  );
}

function Review({ review }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(review.text);
  const dispatch = useReviewsDispatch();

  if (isEditing) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsEditing(false);
          dispatch({
            type: "changed",
            review: {
              ...review,
              text: e.target.text.value,
              rating: e.target.rating.value,
            },
          });
        }}
      >
        <input
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Rating rating={review.rating} disabled={false} />
        <button type="submit">Save</button>
      </form>
    );
  } else {
    return (
      <div>
        <span>{review.text}</span>
        <Rating rating={review.rating} disabled={true} />
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => dispatch({ type: "deleted", id: review.id })}>
          Delete
        </button>
      </div>
    );
  }
}
