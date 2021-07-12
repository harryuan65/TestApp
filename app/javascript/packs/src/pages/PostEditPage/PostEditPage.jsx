import React, { useEffect, useState } from "react";
import APIManager from "../../utils/APIManager";
import PostContainer from "../../components/Containers/PostContainer/PostContainer";
import RTE from "../../components/Containers/RTE/RTE";
import classes from "./PostEditPage.module.scss";
import { useHistory } from "react-router";

const PostEditPage = ({ match }) => {
  const { postId } = match.params;
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [responseError, setResponseError] = useState(null);

  useEffect(() => {
    APIManager.Instance()
      .get(`posts/${postId}.json`)
      .then((response) => {
        const post = response.data;
        setPost(post);
        // console.log(response.headers)
        // APIManager.Instance().setCSRFTOken()
        // document.getElementById('content').value = post.content;
        // const editor = document.querySelector('trix-editor').editor;
        // editor.insertHTML(post.content);
        setLoading(false);
      })
      .catch((error) => {
        setResponseError(e);
        setLoading(false);
      });
  }, []);

  const handleContentChange = (content) => {
    const updatedPost = { ...post };
    updatedPost.content = content;
    setPost(updatedPost);
  };

  const handleTitleChange = (event) => {
    const updatedPost = { ...post };
    updatedPost.title = event.target.value;
    setPost(updatedPost);
  };

  const history = useHistory();
  const savePost = (event) => {
    event.preventDefault();
    APIManager.Instance()
      .put(`posts/${postId}`, post)
      .then((response) => {
        history.push(`/post/${postId}`);
      })
      .catch((err) => setResponseError(err));
  };

  return post ? (
    <PostContainer
      style={{ padding: "30px", marginRight: "0", position: "relative" }}
    >
      <div
        contentEditable
        className={classes.EditTitle}
        onChange={handleTitleChange}
        suppressContentEditableWarning
      >
        {post.title}
      </div>
      <RTE content={post.content} onChange={handleContentChange} />
      <button type="submit" onClick={savePost}>
        OK
      </button>
    </PostContainer>
  ) : (
    <PostContainer>
      <h1>Loading...</h1>
    </PostContainer>
  );
};

export default PostEditPage;
