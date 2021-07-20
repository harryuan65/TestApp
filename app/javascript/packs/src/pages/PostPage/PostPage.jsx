import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PostContainer from "../../components/Containers/PostContainer/PostContainer";
import PostContentPlaceholder from "../../components/Containers/PostPlaceholder/PostContentPlaceholder";
import WeeklyFeedContainer from "../../components/Containers/WeeklyFeedContainer/WeeklyFeedContainer";
import APIManager from "../../utils/APIManager";
import Hoc from "../../components/hoc";
import classes from "./PostPage.module.scss";
import Editor from "../../components/Containers/Editor/Editor";
import TagList from "../../components/UI/TagList/TagList";
import MySadComputer from '../../assets/images/BrokenSad.png';

const PostPage = ({ match }) => {
  const { postId } = match.params;
  const history = useHistory();
  const goToTagsPage = (tag) => {
    history.push(`/tag/${tag}`);
  };

  const [post, setPost] = useState({});
  const [editing, setEditing] = useState(false);
  const [postReady, setPostReady] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const fetchPost = async () => {
    setPostReady(false);
    // await new Promise((resolve) => {setTimeout(resolve, 30000)});
    APIManager.Instance()
      .get(`posts/${postId}.json`)
      .then((response) => {
        const post = response.data;
        setPost(post);
        setPostReady(true);
      })
      .catch((error) => {
        setResponseError(error);
      });
  };

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  const toggleEditing = () => {
    setEditing(!editing);
  };

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

  const savePost = async (event) => {
    event.preventDefault();
    setPostReady(false);
    // await new Promise((resolve) => {setTimeout(resolve, 30000)});
    APIManager.Instance()
      .put(`posts/${postId}`, post)
      .then((response) => {
        const post = response.data;
        setPost(post);
        setPostReady(true);
        setEditing(false);
      })
      .catch((err) => {
        setResponseError(err);
      });
  };

  let image = null;

  if (responseError) {
    return (
      <PostContainer>
        <div className={[classes.PostBlock, classes.WrapResponseError].join(' ')}>
          <img src={MySadComputer} />
          <h1 className={classes.Title}>Oops! 好像有東西壞掉了，一定是哈利在玩耍導致的。</h1>
          <p>{responseError.message}</p>
          <button className={[classes.btn, classes.primary].join(' ')} onClick={() => history.push('/') }>重新整理</button>
        </div>
      </PostContainer>
    );
  }
  let editPostContainer = (
    <PostContainer
      // style={{ padding: "30px", marginRight: "0", position: "relative" }}
    >
    <div className={classes.PostBlock}>
    <div className={classes.TitleWrap}>
      <input
        className={[classes.Title, classes.EditTitle].join(' ')}
        onChange={handleTitleChange}
        value={post.title}
      >
      </input>
      <button className={[classes.btn, classes.warning].join(' ')} onClick={ () => toggleEditing()}>&#x2715; 取消</button>
      </div>
      <Editor content={post.content} onChange={handleContentChange} />
      <button type="submit" onClick={savePost} disabled={!postReady && 'disabled'} className={ !postReady && classes.CircularLoading || '' }>{postReady ? "儲存" : '\u00A0'}</button>
      <div>
      <p>{post.title}</p>
      </div>
    </div>
    </PostContainer>
  );

  let showPostContainer = (
    <PostContainer>
      {image}
      <div className={classes.PostBlock}>
        <div className={classes.TitleWrap}>
          <h1 className={classes.Title}>
            {(postReady && post.title) || <Hoc>
              <div className={classes.LoadingDot} style={{animationDelay: "0ms"  }}></div>
              <div className={classes.LoadingDot} style={{animationDelay: "150ms"}}></div>
              <div className={classes.LoadingDot} style={{animationDelay: "300ms"}}></div>
            </Hoc>}
          </h1>
          {postReady && <button className={[classes.btn, classes.primary].join(' ')} onClick={() => toggleEditing()}>&#x270e; 編輯</button>}
        </div>
        {postReady && (
          <TagList tags={post.tags} tagSelectHandler={goToTagsPage}/>
        )}
        {/* <PostDesc
            author={post.author}
            createdAt={post.createdAt}
            tags={post.tags || []}
            tagSelectHandler={goToTagsPage || (() => {})}
          /> */}
        {postReady ? (
          <div
            className={classes.PostContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        ) : (
          <PostContentPlaceholder />
        )}
      </div>
    </PostContainer>
  );

  return (
    <Hoc>
      {editing ? editPostContainer : showPostContainer}
    </Hoc>
  );
};

export default PostPage;
