import ReviewsProvider from "./components/ReviewsContext";
import Rating from "./components/Rating";
import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";

export default function App() {
  return (
    <ReviewsProvider>
      <ReviewForm />
      <ReviewList />
    </ReviewsProvider>
  );
}
