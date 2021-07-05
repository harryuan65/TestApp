import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import classes from "./PostShowContainer.module.scss";
import PlaceholderFeatured from "../../../assets/images/post/PlaceholderFeatured.png";
import ParagraphPlaceholder from "../../UI/Placeholder/ParagraphPlaceholder/ParagraphPlaceholder";
import ImagePlaceholder from "../../UI/Placeholder/ImagePlaceholder/ImagePlaceholder";
import axios from "axios";
import PostDesc from "../../UI/PostDesc/PostDesc";

const PostShowContainer = ({ postId }) => {
  const history = useHistory();
  const goToTagsPage = (tag) => {
    history.push(`/tag/${tag}`);
  };

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const fetchPost = async () => {
    setLoading(true);
    // await new Promise((resolve) => {setTimeout(resolve, 3000)});
    axios
      .get(`/api/v1/posts/${postId}.json`)
      .then((response) => {
        const post = response.data;
        setPost(post);
        setLoading(false);
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
    } else if (post.useDefaultFeaturedImage) {
      try {
        console.log(
          `../../../assets/images/post/${post.useDefaultFeaturedImage}.png`
        );
        const localImage =
          require(`../../../assets/images/post/${post.useDefaultFeaturedImage}.png`).default;
        image = <img src={localImage} alt="featuredImage" />;
      } catch (e) {
        image = <img src={PlaceholderFeatured} alt="featuredImage" />;
      }
    }
  } else {
    image = <img src={PlaceholderFeatured} alt="featuredImage" />;
  }

  const contentPlaceholder = (
    <div>
      <ParagraphPlaceholder
        holders={[
          { width: "470px", height: "15px" },
          { width: "470px", height: "15px" },
          { width: "220px", height: "15px" },
        ]}
      />
      <ImagePlaceholder width="470px" height="100px" />
      <ParagraphPlaceholder
        holders={[
          { width: "470px", height: "15px" },
          { width: "200px", height: "15px" },
        ]}
      />
    </div>
  );

  let renderTitle = (!loading && post.title) || "Loading...";
  let renderPostDesc = (
    <PostDesc
      author={!loading && post.author}
      createdAt={!loading && post.createdAt}
      tags={(!loading && post.tags) || []}
      tagSelectHandler={(!loading && goToTagsPage) || (() => {})}
    />
  );
  let renderContent = contentPlaceholder;

  if(responseError) {
    return (
      <div className={classes.PostShowContainer}>
        <div className={classes.PostBlock}>
          <h1>Oops! Something went wrong.</h1>
        </div>
      </div>
    );
  }

  if (!loading && post.content) {
    renderContent = (
      <div
        className={classes.PostContent}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    );
  }
  // else renders placeholders
  return (
    <div className={classes.PostShowContainer}>
      {image}
      <div className={classes.PostBlock}>
        <h1 className={classes.Title}>{renderTitle}</h1>
        {renderPostDesc}
        {renderContent}
      </div>
    </div>
  );

};

export default PostShowContainer;
