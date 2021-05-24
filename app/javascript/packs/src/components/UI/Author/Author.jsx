import React from "react";
import classes from "./Author.module.scss";
import SentencePlaceholder from "../Placeholder/SentencePlaceholder/SentencePlaceholder";
import AvatarPlaceholder from "../Placeholder/AvatarPlaceholder/AvatarPlaceholder";

const Author = ({ loading, id, name, pictureUrl, createdAt }) => {
  const avatar = ( loading || !pictureUrl ? <AvatarPlaceholder/> :
    <img src={pictureUrl} alt={`${name}'s`} />
  );

  const authorName = loading ?
    <SentencePlaceholder width="100px" height="15px"/>
    : <p>{name || 'anonymous'}</p>;

  const postCreatedAt = loading ? (
    <SentencePlaceholder width="60px" height="15px"/>
  ) : (
    <span>{createdAt}</span>
  );
  return (
    <div className={classes.Author}>
      {avatar}
      <div className={classes.WrapNameCreatedAt}>
        {authorName}
        {postCreatedAt}
      </div>
    </div>
  );
};

export default Author;
