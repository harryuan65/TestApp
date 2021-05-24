import React from "react";
import Author from "../Author/Author";
import TagList from "../TagList/TagList";
import classes from "./PostDesc.module.scss";

const PostDesc = ({ author, createdAt, tags, tagSelectHandler }) => {
  const { id, name, pictureUrl } = author || {};
  const showTags = tags ? (
    <TagList tags={tags} tagSelectHandler={tagSelectHandler}/>
  ) : null;
  return (
    <div className={classes.PostDesc}>
      <Author id={id} name={name} pictureUrl={pictureUrl} createdAt={createdAt} />
      {showTags}
    </div>
  );
};

export default PostDesc;
