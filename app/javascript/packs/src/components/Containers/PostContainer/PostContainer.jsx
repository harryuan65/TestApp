import React from 'react'
import classes from './PostContainer.module.scss'

const PostContainer = ({children, style}) => {
  return (
    <div className={classes.PostContainer} style={style}>
      {children}
    </div>
  )
}
export default PostContainer
