// import React from "react";
// import PostShowContainer from "../components/Containers/PostShowContainer/PostShowContainer";
// import WeeklyFeedContainer from "../components/Containers/WeeklyFeedContainer/WeeklyFeedContainer";
// import Hoc from "../components/hoc";

// const PostShowPage = ({ match }) => {
//   const { postId } = match.params;
//   return (
//     <Hoc>
//       <PostShowContainer postId={postId} />
//       <WeeklyFeedContainer />
//     </Hoc>
//   );
// };

// export default PostShowPage;
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PostContainer from "../../components/Containers/PostContainer/PostContainer";
import PostContentPlaceholder from "../../components/Containers/PostPlaceholder/PostContentPlaceholder";
import WeeklyFeedContainer from "../../components/Containers/WeeklyFeedContainer/WeeklyFeedContainer";
import APIManager from "../../utils/APIManager";
import Hoc from "../../components/hoc";
import PostDesc from "../../components/UI/PostDesc/PostDesc";
import classes from "./PostPage.module.scss";
import RTE from "../../components/Containers/RTE/RTE";
import TagList from "../../components/UI/TagList/TagList";
import MySadComputer from '../../assets/images/BrokenSad.png';


const PostPage = ({ match }) => {
  const { postId } = match.params;
  const history = useHistory();
  const goToTagsPage = (tag) => {
    history.push(`/tag/${tag}`);
  };

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [postReady, setPostReady] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const fetchPost = async () => {
    setLoading(true);
    // await new Promise((resolve) => {setTimeout(resolve, 10000)});
    APIManager.Instance()
      .get(`posts/${postId}.json`)
      .then((response) => {
        const post = response.data;
        setPost(post);
        setLoading(false);
        setPostReady(true);
      })
      .catch((error) => {
        setResponseError(error);
        setLoading(false);
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

  const savePost = (event) => {
    event.preventDefault();
    setLoading(true);
    APIManager.Instance()
      .put(`posts/${postId}`, post)
      .then((response) => {
        const post = response.data;
        setPost(post);
        setLoading(false);
        setEditing(false);
      })
      .catch((err) => {
        setResponseError(err);
        setLoading(false);
      });
  };

  let image = null;

  if (responseError) {
    return (
      <PostContainer>
        <div className={[classes.PostBlock, classes.WrapResponseError].join(' ')}>
          <img src={MySadComputer} />
          <h1 className={classes.Title}>Oops! 好像有東西壞掉了，一定是哈利在玩耍導致的。</h1>
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
      <h1
        contentEditable
        className={[classes.Title, classes.EditTitle].join(' ')}
        onChange={handleTitleChange}
        suppressContentEditableWarning
      >
        {post.title}
      </h1>
      <button className={[classes.btn, classes.warning].join(' ')} onClick={ () => toggleEditing()}>&#x2715; 取消</button>
      </div>
      <RTE content={post.content} onChange={handleContentChange} />
      <button type="submit" onClick={savePost}>
        儲存
      </button>
    </div>
    </PostContainer>
  );

  let showPostContainer = (
    <PostContainer>
      {image}
      <div className={classes.PostBlock}>
        <div className={classes.TitleWrap}>
          <h1 className={classes.Title}>
            {(postReady && post.title) || "Loading..."}
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
      <WeeklyFeedContainer />
    </Hoc>
  );
};

export default PostPage;
