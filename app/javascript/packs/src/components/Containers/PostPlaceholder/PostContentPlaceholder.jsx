import PlaceholderFeatured from "../../../assets/images/post/PlaceholderFeatured.png";
import ParagraphPlaceholder from "../../UI/Placeholder/ParagraphPlaceholder/ParagraphPlaceholder";
import ImagePlaceholder from "../../UI/Placeholder/ImagePlaceholder/ImagePlaceholder";


import React from 'react'

const PostContentPlaceholder = () => {
  return (
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
  )
}

export default PostContentPlaceholder
