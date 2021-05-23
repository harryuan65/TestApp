import React from 'react'
import WeeklyBlock from './WeeklyBlock/WeeklyBlock';
import classes from './WeeklyFeedContainer.module.scss';
const WeeklyFeedContainer = () => {
  const defaultFeedTopics = ['ruby', 'golang'];
  return (
    <div className={classes.WeeklyFeedContainer}>
      <h1>Weekly Feed</h1>
      {defaultFeedTopics.map(t => <WeeklyBlock key={t} feedTopic={t}/>)}
    </div>
  )
}

export default WeeklyFeedContainer
