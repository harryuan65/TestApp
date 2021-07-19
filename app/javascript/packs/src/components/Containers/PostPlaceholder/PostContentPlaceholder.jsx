import PlaceholderFeatured from "../../../assets/images/post/PlaceholderFeatured.png";
import ParagraphPlaceholder from "../../UI/Placeholder/ParagraphPlaceholder/ParagraphPlaceholder";
import ImagePlaceholder from "../../UI/Placeholder/ImagePlaceholder/ImagePlaceholder";


import React from 'react'

const PostContentPlaceholder = () => {
  return (
    <div>
      <ParagraphPlaceholder
        holders={[
          { width: "90%", height: "15px" },
          { width: "90%", height: "15px" },
          { width: "25%", height: "15px" },
        ]}
      />
      <ImagePlaceholder width="90%" height="130px" />
      <ParagraphPlaceholder
        holders={[
          { width: "90%", height: "15px" },
          { width: "25%", height: "15px" },
        ]}
      />
    </div>
  )
}

export default PostContentPlaceholder
