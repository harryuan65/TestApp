import classes from "./SentencePlaceholder.module.scss";
import React from "react";

const SentencePlaceholder = ({ width, height }) => (
  <div
    className={classes.SentencePlaceholder}
    style={{ width: width, height: height }}
  ></div>
);

export default SentencePlaceholder;
