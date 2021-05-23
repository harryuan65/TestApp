import React from 'react';
import classes from "./Tag.module.scss";
const Tag = ({selected, selectTag, name}) => {
  let classNames = classes.selectedTopic;
  if (selected) {
    classNames = { ...classNames, ...classes.selected };
  }
  return (
    <h3 className={classNames}
          onClick={ () => selectTag(name) } >
      # {name || "Unknown"}
    </h3>
  );
};

export default Tag;
