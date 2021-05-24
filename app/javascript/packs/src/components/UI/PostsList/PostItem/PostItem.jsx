import classes from "./PostItem.module.scss";
import React from "react";
import { Link } from "react-router-dom";
import PostDesc from "../../PostDesc/PostDesc";

const PostItem = ({ id, title, author, createdAt, tags, tagSelectHandler }) => {
  return (
    <div className={classes.PostItem}>
      <Link className={classes.Title} to={(id && `/post/${id}`) || "#"}>
        {title}
      </Link>
      <PostDesc author={author} createdAt={createdAt} tags={tags} tagSelectHandler={tagSelectHandler}/>
    </div>
  );
};

export default PostItem;
