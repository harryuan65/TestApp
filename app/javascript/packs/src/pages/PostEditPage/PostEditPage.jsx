import React, { useEffect, useState } from 'react'
import axios from '../../client/axios';
import PostContainer from '../../components/Containers/PostContainer/PostContainer';
import RTE from '../../components/Containers/RTE/RTE';
import classes from './PostEditPage.module.scss';

const PostEditPage = ({ match }) => {
  const { postId } = match.params;
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [responseError, setResponseError] = useState(null);

  useEffect(() => {
    axios.get(`/api/v1/posts/${postId}.json`)
    .then(response => {
      const post = response.data;
      setPost(post);
      console.log(post.title);
      // document.getElementById('content').value = post.content;
      // const editor = document.querySelector('trix-editor').editor;
      // editor.insertHTML(post.content);
      setLoading(false);
    }).catch(error => {
      setResponseError(e);
      setLoading(false);
    })
  }, []);

  const handleChange = (content) => {
    const updatedPost = {...post};
    updatedPost.content = content;
    setPost(updatedPost);
    console.log(updatedPost.content);
  }

  const updateTitle = (event) => {
    const updatedPost = {...post};
    updatedPost.title = event.target.value;
    setPost(updatedPost);
    console.log(updatedPost.title);
  }
  return (
    (
      post ? <PostContainer style={ {padding: '30px', marginRight: '0' } }>
      <input className={classes.EditTitle} type="text" name="title" value={post.title || ""} onChange={updateTitle}/>
      <RTE content={post.content} onChange={handleChange}/>
      <pre>{JSON.stringify(post.content, null ,2)}</pre>
    </PostContainer> :
    <PostContainer><h1>Loading...</h1></PostContainer>
    )
  )
}

export default PostEditPage
