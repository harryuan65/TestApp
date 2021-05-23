import classes from "./ParagraphPlaceholder.module.scss";
import React from "react";

const ParagraphPlaceholder = ({ holders }) => (
  <div className={classes.ParagraphGroup}>
    {holders.map((e) => (
      <div
        className={classes.Paragraph}
        style={{ width: e.width, height: e.height }}
      ></div>
    ))}
  </div>
);

export default ParagraphPlaceholder;
