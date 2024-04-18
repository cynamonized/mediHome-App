import React, { useState, useEffect } from "react";
import EmptyStar from "../../../../images/Landing Page/reviews/EmptyStar.svg";
import FullStar from "../../../../images/Landing Page/reviews/FullStar.svg";
import HalfStar from "../../../../images/Landing Page/reviews/HalfStar.svg";

export const TestimonialsRating = ({ rating }) => {
  const [result, setResult] = useState(0);
  const generateStars = (number) => {
    switch (number) {
      case 0:
        setResult(
          <div className="single-rating">
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
          </div>
        );
        break;
      case 0.5:
        setResult(
          <div className="single-rating">
            <img src={HalfStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
          </div>
        );
        break;

      case 1:
        setResult(
          <div className="single-rating">
            <img src={FullStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
          </div>
        );
        break;

      case 1.5:
        setResult(
          <div className="single-rating">
            <img src={FullStar}></img>
            <img src={HalfStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
          </div>
        );
        break;

      case 2:
        setResult(
          <div className="single-rating">
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
          </div>
        );
        break;

      case 2.5:
        setResult(
          <div className="single-rating">
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={HalfStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
          </div>
        );
        break;

      case 3:
        setResult(
          <div className="single-rating">
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={EmptyStar}></img>
            <img src={EmptyStar}></img>
          </div>
        );
        break;

      case 3.5:
        setResult(
          <div className="single-rating">
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={HalfStar}></img>
            <img src={EmptyStar}></img>
          </div>
        );
        break;

      case 4:
        setResult(
          <div className="single-rating">
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={EmptyStar}></img>
          </div>
        );
        break;

      case 4.5:
        setResult(
          <div className="single-rating">
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={HalfStar}></img>
          </div>
        );
        break;

      case 5:
        setResult(
          <div className="single-rating">
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={FullStar}></img>
          </div>
        );
        break;
    }
  };

  useEffect(() => {
    generateStars(rating);
  }, [rating]);

  return <>{result}</>;
};
