//npm install react-icons --save

import React from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: " center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5em",
};

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating = () => {},
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#using_arrow_functions_and_array.from */}
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRating={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <div style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </div>
    </div>
  );
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};

const Star = ({ onRating, full, onHoverIn, onHoverOut, color, size }) => {
  const starStyle = {
    display: "block",
    cursor: "pointer",
    color,
    fontSize: `${size}px`,
  };
  return (
    <>
      {full ? (
        <BsStarFill
          style={starStyle}
          role="button"
          onClick={onRating}
          onMouseEnter={onHoverIn}
          onMouseLeave={onHoverOut}
        />
      ) : (
        <BsStar
          style={starStyle}
          role="button"
          onClick={onRating}
          onMouseEnter={onHoverIn}
          onMouseLeave={onHoverOut}
        />
      )}
    </>
  );
};

export default StarRating;
