import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import classes from "./PostShowContainer.module.scss";
import samplePost from "./sample_post";
import PlaceholderFeatured from "../../../assets/images/post/PlaceholderFeatured.png";
import ParagraphPlaceholder from "../../UI/Placeholder/ParagraphPlaceholder/ParagraphPlaceholder";
import ImagePlaceholder from "../../UI/Placeholder/ImagePlaceholder/ImagePlaceholder";
import TagList from "../../UI/TagList/TagList";

const PostShowContainer = ({ postId }) => {
  const history = useHistory();
  const goToTagsPage = (tag) => {
    history.push(`/tag/${tag}`);
  };

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchPost = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setPost(samplePost);
    setLoading(false);
  };

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  let image = null;
  if (!loading && post && post.featuredImageUrl) {
    image = <img src={post.featuredImageUrl} alt="featuredImage" />;
  } else if (!loading && post && post.useDefaultFeaturedImage) {
    try {
      console.log(`../../../assets/images/post/${post.useDefaultFeaturedImage}.png`)
      const localImage = require(`../../../assets/images/post/${post.useDefaultFeaturedImage}.png`)
        .default;
      image = <img src={localImage} alt="featuredImage" />;
    } catch (e) {
      image = <img src={PlaceholderFeatured} alt="featuredImage" />;
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

  return (
    <div className={classes.PostShowContainer}>
      {image}
      <div className={classes.PostBlock}>
        <h1 className={classes.Title}>
          {(!loading && post.title) || "Loading..."}
        </h1>
        <TagList
          tags={(!loading && post.tags) || []}
          tagSelectHandler={(!loading && goToTagsPage) || (() => {})}
        />
        {!loading && post.content ? (
          <div
            className={classes.PostContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        ) : (
          contentPlaceholder
        )}
      </div>
    </div>
  );
};

export default PostShowContainer;
