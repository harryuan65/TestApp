import React from "react";
import classes from "./ImagePlaceholder.module.scss";

const ImagePlaceholder = ({ width, height }) => {
  return (
    <div
      className={classes.ImagePlaceholder}
      style={{ width, height }}
    ></div>
  );
};

export default ImagePlaceholder;
