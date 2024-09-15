import { useState } from "react";
import { useReviews, useReviewsDispatch } from "./ReviewsContext";
import Rating from "./Rating";

export default function ReviewForm() {
  const [text, setText] = useState("");
  const reviews = useReviews();
  const dispatch = useReviewsDispatch();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: "added",
          id: reviews.length,
          text: e.target.text.value,
          rating: e.target.rating.value,
        });
        setText("");
        // console.log(e.target.rating);
      }}
    >
      <div>
        <label htmlFor="text">Review</label>
        <textarea
          name="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <label>Rating</label>
        <Rating disabled={false} />
      </div>
      <div>
        <button type="submit" disabled={!text.trim()}>
          Post
        </button>
      </div>
    </form>
  );
}
