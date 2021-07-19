import React from "react";
import classes from "./ImagePlaceholder.module.scss";

const ImagePlaceholder = ({ width, height, animationDelay }) => {
  return (
    <div className={classes.WrapImagePlaceholder}>
      <div
        className={classes.ImagePlaceholder}
        style={{ width, height, animationDelay }}
      ></div>
    </div>
  );
};

export default ImagePlaceholder;
