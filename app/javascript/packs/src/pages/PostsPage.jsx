import React, { useState } from 'react'
import TagsContainer from '../components/Containers/TagsContainer/TagsContainer'
import PostListContainer from '../components/Containers/PostListContainer/PostListContainer'
import WeeklyFeedContainer from '../components/Containers/WeeklyFeedContainer/WeeklyFeedContainer'
import defaultTags from '../assets/shared/default_tags';
import Hoc from '../components/hoc'
const getUpdatedTags = (allTags, selectedTagName) => {
  let newCurrentTag = null;
  let selectedExisting = false;
  const newTags = allTags.slice().map( (tag) => {
    if (tag.name === selectedTagName) {
      tag.selected = true;
      selectedExisting = true;
      newCurrentTag = tag;
    } else if (tag.selected){
      delete tag.selected;
    }
    return tag;
  });

  if(!selectedExisting){
    newCurrentTag = {
      name: selectedTagName,
      url: `/${selectedExisting}`,
    }
    newTags.push(newCurrentTag)
  }

  return [newCurrentTag, newTags];
}
const PostsPage = ({history, match}) => {
  const currentTagName = match.params.currentTagName || 'latest';
  const [defaultCurrentTag, defaultCurrentTags] = getUpdatedTags(defaultTags, currentTagName);
  const [tags, setTags] = useState(defaultCurrentTags);
  const [currentTag, setCurrentTag] = useState({...defaultCurrentTag, selected: true});
  const tagSelectHandler = (selectedTagName) => {
    let [newCurrentTag, newTags] = getUpdatedTags(tags, selectedTagName);
    setTags(newTags);
    setCurrentTag(newCurrentTag);
    history.push(newCurrentTag.url);
  }
  return (
    <Hoc>
      <TagsContainer tags={tags} tagSelectHandler={tagSelectHandler}/>
      <PostListContainer chosenTag={currentTag} tagSelectHandler={tagSelectHandler}/>
      <WeeklyFeedContainer />
    </Hoc>
  )
}

export default PostsPage
