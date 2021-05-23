import React from "react";
import PostShowContainer from "../components/Containers/PostShowContainer/PostShowContainer";
import WeeklyFeedContainer from "../components/Containers/WeeklyFeedContainer/WeeklyFeedContainer";
import Hoc from "../components/hoc";

const PostShowPage = ({ match }) => {
  const { postId } = match.params;
  return (
    <Hoc>
      <PostShowContainer postId={postId} />
      <WeeklyFeedContainer />
    </Hoc>
  );
};

export default PostShowPage;
