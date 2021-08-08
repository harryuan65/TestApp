import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PostContainer from "../../components/Containers/PostContainer/PostContainer";
import PostContentPlaceholder from "../../components/Containers/PostPlaceholder/PostContentPlaceholder";
import WeeklyFeedContainer from "../../components/Containers/WeeklyFeedContainer/WeeklyFeedContainer";
import APIManager from "../../utils/APIManager";
import Hoc from "../../components/hoc";
import classes from "./PostPage.module.scss";
// import Editor from "../../components/Containers/Editor/Editor";
import TagList from "../../components/UI/TagList/TagList";
import Error from "../../components/UI/Error/Error";
import RichTextEditor from "../../components/Containers/RichTextEditor/RichTextEditor";

const PostPage = ({ match, author }) => {
  let { postId } = match.params;
  const history = useHistory();
  const goToTagsPage = (tag) => {
    history.push(`/tag/${tag}`);
  };

  const [post, setPost] = useState({title: '', content: '', author_id: author.id});
  const [editing, setEditing] = useState(true);
  const [isNewPost, setIsNewPost] = useState(match.url === '/post/new');
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

  if (match.url === '/post/new' && !isNewPost) setIsNewPost(true);

  useEffect(() => {
    if (isNewPost) {
      setPost({title: '', content: '', author_id: author.id});
      setEditing(true);
      setPostReady(true);
    }
    else if(postId)
      fetchPost(postId);
  }, [isNewPost, postId]);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleTitleChange = (title) => {
    setPost({...post, title});
  };

  const handleContentChange = (content) => {
    setPost({...post, content});
  };

  const savePost = async (event) => {
    event.preventDefault();
    setPostReady(false);
    // await new Promise((resolve) => {setTimeout(resolve, 30000)});
    if (isNewPost) {
      APIManager.Instance()
        .post('posts', post)
        .then((response) => {
          const post = response.data;
          setPost(post);
          setEditing(false);
          setIsNewPost(false);
          setPostReady(true);
          postId = post.id;
          history.push(`${postId}`);
        })
        .catch((err) => {
          setResponseError(err);
        });
    } else {
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
    }
  };

  let image = null;

  if (responseError) {
    return (
      <Error error={responseError}/>
    );
  }
  let editPostContainer = (
    <PostContainer
      // style={{ padding: "30px", marginRight: "0", position: "relative" }}
      style={ isNewPost || editing ? {gridColumn: '1/4'} : {}}
    >
    <div className={classes.PostBlock}>
      <div className={classes.TitleWrap}>
        <textarea
          type="text"
          cols="10"
          row="14"
          className={[classes.Title, classes.EditTitle].join(' ')}
          onChange={(event) => {handleTitleChange(event.target.value); }}
          value={post.title}
          placeholder={isNewPost ? "新增標題..." : null}
          style={{
            width: '100%',
            overflow: 'scroll',
            resize: 'none'
          }}
        />
        {!isNewPost && <button className={[classes.btn, classes.warning].join(' ')} onClick={ () => toggleEditing()}>&#x2715; 取消</button>}
      </div>
      {/* <Editor content={post.content} contentChange={handleContentChange} /> */}
      <RichTextEditor/>
      <button type="submit" onClick={savePost} style={{marginBottom: '20px'}} disabled={!postReady && 'disabled'} className={ !postReady && classes.CircularLoading || '' }>{postReady ? "儲存" : '\u00A0'}</button>
    </div>
    {/* {post.title} */}
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
          {postReady && author.loggedIn && <button className={[classes.btn, classes.primary].join(' ')} onClick={() => toggleEditing()}>&#x270e; 編輯</button>}
        </div>
        {postReady && post.tags && (
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
