import classes from "./ParagraphPlaceholder.module.scss";
import React from "react";

const ParagraphPlaceholder = ({ holders }) => (
  <div className={classes.ParagraphGroup}>
    {holders.map((e) => (
      <div
        key={parseInt(Math.random()*100000)}
        className={classes.Paragraph}
        style={{ width: e.width, height: e.height, animationDelay: e.animationDelay }}
      ></div>
    ))}
  </div>
);

export default ParagraphPlaceholder;
