import { act, createContext, useContext, useEffect, useReducer } from "react";

const ReviewsContext = createContext(null);
const ReviewsDispatchContext = createContext(null);

export default function ReviewsProvider({ children }) {
  const [reviews, dispatch] = useReducer(
    reviewsReducer,
    JSON.parse(localStorage.getItem("reviews")) ?? initialReviews
  );

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  return (
    <ReviewsContext.Provider value={reviews}>
      <ReviewsDispatchContext.Provider value={dispatch}>
        {children}
      </ReviewsDispatchContext.Provider>
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  return useContext(ReviewsContext);
}

export function useReviewsDispatch() {
  return useContext(ReviewsDispatchContext);
}

function reviewsReducer(reviews, action) {
  switch (action.type) {
    case "added": {
      return [
        ...reviews,
        {
          id: action.id,
          text: action.text,
          rating: action.rating,
        },
      ];
    }
    case "changed": {
      return reviews.map((t) => {
        if (t.id === action.review.id) {
          return action.review;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return reviews.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialReviews = [
  { id: 0, text: "Philosopher’s Path", rating: "3" },
  { id: 1, text: "Visit the temple", rating: "2" },
  { id: 2, text: "Drink matcha", rating: "4" },
];
