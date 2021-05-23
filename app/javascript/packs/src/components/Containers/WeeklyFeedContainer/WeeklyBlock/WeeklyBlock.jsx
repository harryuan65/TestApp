import React, { useEffect, useState } from "react";
import rubyFeed from "./sample/ruby_feed";
import goFeed from "./sample/go_feed";
import classes from "./WeeklyBlock.module.scss";
import { Link } from "react-router-dom";

const upCase = (str) => str[0].toUpperCase() + str.slice(1, str.length);

const WeeklyBlock = ({ feedTopic }) => {
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchFeedPosts = async (title, url) => {
    setLoading(true);
    // Mock fetching
    console.log("Sleeping");
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 800));
    console.log("Slept 2s");
    let posts = [];
    switch (title) {
      case "ruby":
        posts = rubyFeed;
        break;
      case "golang":
        posts = goFeed;
        break;
      default:
        posts = rubyFeed;
        break;
    }
    setFeedPosts(posts);
    setLoading(false);
  };
  useEffect(() => {
    fetchFeedPosts(feedTopic);
  }, [feedTopic]);
  return (
    <div className={classes.WeeklyBlock}>
      <h3>{upCase(feedTopic)} Weekly<Link to={`/feed/${feedTopic}` }>view all</Link></h3>
      <ul className={classes.FeedPosts}>
        {loading
          ? "Loading..."
          : feedPosts.map((post) => (
              <li key={post} className={classes.FeedPost}>
                <Link to={`/${post}`}>{post}</Link>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default WeeklyBlock;
