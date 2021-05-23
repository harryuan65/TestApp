import React from "react";
import Author from "../Author/Author";
import TagList from "../TagList/TagList";
import classes from "./PostDesc.module.scss";

const PostDesc = ({ author, tags, tagSelectHandler }) => {
  const { id, name, picture, createdAt } = author || {};
  const showTags = tags ? (
    <TagList tags={tags} tagSelectHandler={tagSelectHandler}/>
  ) : null;
  return (
    <div className={classes.PostDesc}>
      <Author id={id} name={name} picture={picture} createdAt={createdAt} />
      {showTags}
    </div>
  );
};

export default PostDesc;
