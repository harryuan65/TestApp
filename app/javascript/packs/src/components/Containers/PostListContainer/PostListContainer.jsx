import React, { useEffect, useState } from "react";
import classes from "./PostListContainer.module.scss";
import latestPosts from "../../UI/PostsList/sample/latest";
import frontend from "../../UI/PostsList/sample/frontend";
import backend from "../../UI/PostsList/sample/backend";
import golang from "../../UI/PostsList/sample/golang";
import PostsList from "../../UI/PostsList/PostsList";

const upCase = (str) => str[0].toUpperCase() + str.slice(1, str.length);

const PostListContainer = (props) => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentPosts, setCurrentPosts] = useState(latestPosts);
  const [loading, setLoading] = useState(true);
  const fetchPostsByTagName = async (tagName, url) => {
    setLoading(true);
    // Mock fetching
    console.log("Sleeping")
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 800));
    console.log("Slept 2s")
    let posts = [];
    switch (tagName) {
      case "latest":
        posts =  latestPosts;
        break;
      case "frontend":
        posts = frontend;
        break;
      case "golang":
        posts = golang;
        break;
      case "backend":
        posts = backend;
        break;
      default:
        posts =  latestPosts;
        break;
    }
    setCurrentPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    const tag = props.chosenTag;
    const { name } = tag;
    setCurrentTitle(upCase(name));
    fetchPostsByTagName(name);
  }, [props.chosenTag]);

  return (
    <div className={classes.PostListContainer}>
      <h1>{currentTitle}</h1>
      {loading
        ? "Loading"
        : <PostsList posts={currentPosts} tagSelectHandler={props.tagSelectHandler}/>}
    </div>
  );
};

export default PostListContainer;
