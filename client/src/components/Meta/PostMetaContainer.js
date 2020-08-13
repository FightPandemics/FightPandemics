import React from "react";
import { Helmet } from "react-helmet-async";

const MAX_CONTENT_LENGTH = 300;

const PostMetaContainer = ({ post }) => {
  const { title, content } = post;
  const descriptionContent =
    content.length > MAX_CONTENT_LENGTH
      ? `${content.substr(0, MAX_CONTENT_LENGTH - 1)}…`
      : content;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <meta name="title" content={title} />
      <meta name="description" content={descriptionContent} />
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={descriptionContent} />
      <meta property="og:url" content={window.location.href} />
      {/* Twitter */}
      <meta property="twitter:description" content={descriptionContent} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:url" content={window.location.href} />
    </Helmet>
  );
};

export default PostMetaContainer;
