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
import { Link } from "react-router-dom";
import PostContainer from "../../components/Containers/PostContainer/PostContainer";
import PostContentPlaceholder from "../../components/Containers/PostPlaceholder/PostContentPlaceholder";
import WeeklyFeedContainer from "../../components/Containers/WeeklyFeedContainer/WeeklyFeedContainer";
import APIManager from "../../utils/APIManager";
import Hoc from "../../components/hoc";
import PostDesc from "../../components/UI/PostDesc/PostDesc";
import classes from './PostPage.module.scss';

const PostPage = ({ match }) => {
  const { postId } = match.params;
  const history = useHistory();
  const goToTagsPage = (tag) => {
    history.push(`/tag/${tag}`);
  };

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
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

  let image = null;
  let finishedLoading = !loading && post;
  if (finishedLoading) {
    if (post.featuredImageUrl) {
      image = <img src={post.featuredImageUrl} alt="featuredImage" />;
    }
  }
  // } else if (post.useDefaultFeaturedImage) {
  //   try {
  //     console.log(
  //       `../../../assets/images/post/${post.useDefaultFeaturedImage}.png`
  //     );
  //     const localImage =
  //       require(`../../../assets/images/post/${post.useDefaultFeaturedImage}.png`).default;
  //     image = <img src={localImage} alt="featuredImage" />;
  //   } catch (e) {
  //     image = <img src={PlaceholderFeatured} alt="featuredImage" />;
  //   }
  // }
  // } else {
  //   image = <img src={PlaceholderFeatured} alt="featuredImage" />;
  // }

  if (responseError) {
    return (
      <PostContainer>
        <div className={classes.PostBlock}>
          <h1>Oops! Something went wrong.</h1>
        </div>
      </PostContainer>
    );
  }

  let renderContent = postReady ? (
    <div
      className={classes.PostContent}
      dangerouslySetInnerHTML={{ __html: post.content }}
    ></div>
  ) : (
    <PostContentPlaceholder />
  );

  return (
    <Hoc>
      <PostContainer>
        {image}
        <div className={classes.PostBlock}>
          <div className={classes.TitleWrap}>
            <h1 className={classes.Title}>
              {(postReady && post.title) || "Loading..."}
            </h1>
            {postReady && <Link to={`/post/${postId}/edit`}>edit</Link>}
          </div>
          {postReady && (
            <PostDesc
              author={post.author}
              createdAt={post.createdAt}
              tags={post.tags || []}
              tagSelectHandler={goToTagsPage || (() => {})}
            />
          )}
          {renderContent}
        </div>
      </PostContainer>
      <WeeklyFeedContainer/>
    </Hoc>
  );
};

export default PostPage;
