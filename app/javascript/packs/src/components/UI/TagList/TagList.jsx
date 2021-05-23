import React from 'react'
import classes from './TagList.module.scss';

const TagList = ({tags, tagSelectHandler}) => {
  return (
    <div>
      <ul className={classes.Tags}>
      {tags.map((t) => (
        <li key={t} className={classes.Tag} onClick={() => tagSelectHandler(t)}>
          #{t}
        </li>
      ))}
    </ul>
    </div>
  )
}

export default TagList
