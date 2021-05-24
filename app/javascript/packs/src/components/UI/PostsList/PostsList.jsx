import React from "react";
import PostItem from "./PostItem/PostItem";
import classes from "./PostsList.module.scss";

const Posts = ({ posts, tagSelectHandler }) => {
  return (
    <div className={classes.PostsList}>
      {posts
        ? posts.map((e) => (
            <PostItem
              key={e.title}
              id={e.id}
              title={e.title}
              author={e.author}
              createdAt={e.createdAt}
              tags={e.tags}
              tagSelectHandler={tagSelectHandler}
            />
          ))
        : null}
    </div>
  );
};

export default Posts;
