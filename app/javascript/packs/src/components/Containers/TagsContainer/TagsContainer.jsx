import classes from "./TagsContainer.module.scss";
import React from "react";
import Tag from "./Tag/Tag";

const TagsContainer = ({tags, tagSelectHandler}) => {
  return (
    <ul className={classes.TagsContainer}>
        {tags.map((t) => (
          <li key={t.name}><Tag name={t.name} url={t.url} selected={t.selected} selectTag={tagSelectHandler}/></li>
        ))}
    </ul>
  );
};

export default TagsContainer;
