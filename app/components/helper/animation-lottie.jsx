"use client";

import Lottie from "lottie-react";

const AnimationLottie = ({
  animationPath,
  width = "100%",
  height = "auto",
  loop = true,
  autoplay = true,
  className = "",
}) => {
  if (!animationPath) {
    console.warn("No animation data provided to AnimationLottie");
    return null;
  }

  return (
    <Lottie
      animationData={animationPath}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={{ width, height }}
    />
  );
};

export default AnimationLottie;
