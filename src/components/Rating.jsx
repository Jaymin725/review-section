import { useEffect, useState } from "react";

function StarIcon({ varient }) {
  switch (varient) {
    case "filled":
      return <i className="bi bi-star-fill"></i>;
    case "outline":
      return <i className="bi bi-star"></i>;
  }
}

export default function Rating({ rating, disabled }) {
  const [selected, setSelected] = useState(rating ?? 1);
  const [hovered, setHovered] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  let ratingContent;
  if (disabled) {
    ratingContent = [...Array(5)].map((undefined, index) => (
      <StarIcon
        key={index}
        varient={index + 1 <= rating ? "filled" : "outline"}
      />
    ));
  } else {
    if (!isHovered) {
      ratingContent = [...Array(5)].map((undefined, index) => (
        <button
          type="button"
          key={index}
          onMouseOver={() => setHovered(index + 1)}
          onClick={() => setSelected(index + 1)}
        >
          <StarIcon varient={index + 1 <= selected ? "filled" : "outline"} />
        </button>
      ));
    } else {
      ratingContent = [...Array(5)].map((undefined, index) => (
        <button
          type="button"
          key={index}
          onMouseOver={() => setHovered(index + 1)}
          onClick={() => setSelected(index + 1)}
        >
          <StarIcon varient={index + 1 <= hovered ? "filled" : "outline"} />
        </button>
      ));
    }
  }

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input type="hidden" name="rating" value={selected} />
      {ratingContent}
    </div>
  );
}
