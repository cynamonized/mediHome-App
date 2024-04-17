import React, { useState, useEffect } from "react";
import { Eyebrow } from "./Utilities/LandingGenericComponents";
import { TestimonialsRating } from "./Utilities/TestimonialsRating";
import Person1 from "../../../images/Landing Page/reviews/Person1.jpg";
import Person2 from "../../../images/Landing Page/reviews/Person2.jpg";
import Person3 from "../../../images/Landing Page/reviews/Person3.jpg";
import { useSpring, useInView, animated, useSprings } from "@react-spring/web";
import { useWindowSize } from "@uidotdev/usehooks";

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
  const size = useWindowSize();
  const [isMobile, setIsMobile] = useState(true);

  const [hoverSprings, sethoverSprings] = useSpring(
    () => ({
      from: { transform: `scale(1)`, zIndex: 0 },
      config: {
        tension: 1000,
        mass: 1,
        velocity: 0.2,
      },
    }),
    []
  );

  useEffect(() => {
    if (size.width <= 670) {
      setIsMobile(true);
    } else if (size.width > 670) {
      setIsMobile(false);
    }
  }, [size.width]);

  const hoverIn = () => {
    sethoverSprings.start({
      delay: 0,
      config: {
        duration: 50,
      },
      to: { zIndex: 1 },
    });

    sethoverSprings.start({
      delay: 0,
      to: { transform: `scale(1.05)` },
    });
  };

  const hoverOut = () => {
    sethoverSprings.start({
      config: {
        duration: 50,
      },
      delay: 0,
      to: { zIndex: 0 },
    });

    sethoverSprings.start({
      delay: 0,
      to: { transform: `scale(1)` },
    });
  };

  return (
    <animated.div
      className="columns__single-column"
      style={isMobile ? {} : { ...hoverSprings }}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
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
    </animated.div>
  );
};
