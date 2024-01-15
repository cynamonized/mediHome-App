import React, { useState, useEffect } from "react";
import { Eyebrow } from "./Utilities/LandingGenericComponents";
import { TestimonialsRating } from "./Utilities/TestimonialsRating";
import Person1 from "../../../images/Landing Page/reviews/Person 1.jpg";
import Person2 from "../../../images/Landing Page/reviews/Person 2.jpg";
import Person3 from "../../../images/Landing Page/reviews/Person 3.jpg";

// MAKE ANY ANIMATION FOR PATIENT PICTURES IN THE FUTURE?

export const Testimonials = () => {
  return (
    <div className="testimonials container">
      <div className="testimonials__section-title">
        <Eyebrow>TESTIMONIALS</Eyebrow>
        <h2 className="landing-section-title">What patients say about us?</h2>
      </div>

      <div className="testimonials__columns">
        <SingleColumn
          image={Person1}
          name={"John Doe"}
          rating={4.5}
          comment={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien, volutpat sed leo ac, dictum placerat ante. In porta risus ut turpis eleifend."
          }
        />
        <SingleColumn
          image={Person2}
          name={"Sara Sandler"}
          rating={4.5}
          comment={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien, volutpat sed leo ac, dictum placerat ante. In porta risus ut turpis eleifend."
          }
        />
        <SingleColumn
          image={Person3}
          name={"Taylor Swift"}
          rating={5}
          comment={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien, volutpat sed leo ac, dictum placerat ante. In porta risus ut turpis eleifend."
          }
        />
      </div>
    </div>
  );
};

const SingleColumn = ({ image, name, rating, comment }) => {
  return (
    <div className="columns__single-column">
      <div className="single-column__head">
        <img src={image} alt="" className="head__image" />
        <p className="head__name">{name}</p>
      </div>

      <div className="single-column__body">
        <p className="body__comment">{comment}</p>
        <div className="body__rating-container">
          <TestimonialsRating rating={rating} />
        </div>
      </div>
    </div>
  );
};
