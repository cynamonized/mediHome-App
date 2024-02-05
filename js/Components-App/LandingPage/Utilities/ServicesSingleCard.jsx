import { useSpring, useInView, animated, useSprings } from "@react-spring/web";

export const SingleCard = ({
  isMobile,
  propsBasic,
  propsMain,
  boxNameCSS,
  logo,
  description,
}) => {
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
      to: { transform: `scale(1.4)` },
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
      style={isMobile ? { ...propsBasic } : { ...propsMain, ...hoverSprings }}
      className={`right-column__specialization-container ${boxNameCSS}`}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      <img src={logo} alt="" className="specialization-container__logo" />
      <p className="specialization-container__description">{description}</p>
    </animated.div>
  );
};
