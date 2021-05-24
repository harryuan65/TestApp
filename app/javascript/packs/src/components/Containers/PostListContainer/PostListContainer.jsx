import React, { useEffect, useState } from "react";
import classes from "./PostListContainer.module.scss";
import PostsList from "../../UI/PostsList/PostsList";
import axios from 'axios';

const upCase = (str) => str[0].toUpperCase() + str.slice(1, str.length);

const PostListContainer = (props) => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentPosts, setCurrentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseError, setResponseError] = useState(null);
  const fetchPostsByTagName = async (tagName, url) => {
    setLoading(true);

    let baseUrl = '/api/v1/posts.json';
    if (tagName){
      baseUrl += `?tag=${tagName}`
    }
    axios.get(baseUrl)
    .then((response) => {
      const { posts } = response.data;
      setCurrentPosts(posts);
      setResponseError(null);
      setLoading(false);
    })
    .catch((error)=>{
      setResponseError(error);
      setLoading(false);
    })
  };

  useEffect(() => {
    const tag = props.chosenTag;
    const { name } = tag;
    setCurrentTitle(upCase(name));
    fetchPostsByTagName(name);
  }, [props.chosenTag]);

  let renderComponents = null;
  if (loading){
    renderComponents = "Loading"
  } else if (responseError){
    renderComponents = <h2>Oops! Something has went wrong.</h2>
  } else if(currentPosts && currentPosts.length === 0){
    renderComponents = <h2>Well, Looks like there's nothing.</h2>
  } else if(currentPosts) {
    renderComponents = <PostsList posts={currentPosts} tagSelectHandler={props.tagSelectHandler}/>
  }
  return (
    <div className={classes.PostListContainer}>
      <h1>{currentTitle}</h1>
      {renderComponents}
    </div>
  );
};

export default PostListContainer;
