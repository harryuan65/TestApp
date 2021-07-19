import ParagraphPlaceholder from "../../UI/Placeholder/ParagraphPlaceholder/ParagraphPlaceholder";
import ImagePlaceholder from "../../UI/Placeholder/ImagePlaceholder/ImagePlaceholder";


import React from 'react'

const PostContentPlaceholder = () => {
  let i = 0;
  return (
    <div>
      <ParagraphPlaceholder
        holders={[
          { width: "90%", height: "15px", animationDelay: `${(++i)*100}ms` },
          { width: "90%", height: "15px", animationDelay: `${(++i)*100}ms` },
          { width: "25%", height: "15px", animationDelay: `${(++i)*100}ms` },
        ]}
      />
      <ImagePlaceholder width="90%" height="130px"  animationDelay={`${(++i)*100}ms`}/>
      <ParagraphPlaceholder
        holders={[
          { width: "90%", height: "15px", animationDelay: `${(++i)*100}ms` },
          { width: "25%", height: "15px", animationDelay: `${(++i)*100}ms` },
        ]}
      />
    </div>
  )
}

export default PostContentPlaceholder
