import React from "react";
// import React, { useState } from "react";
import { Card, WhiteSpace } from "antd-mobile";
// import { Modal, Card, WhiteSpace } from "antd-mobile";
import PostCard from "./PostCard";
// import PostSocial from "./PostSocial";
// import Comments from "./Comments";
import FilterTag from "../../components/Tag/FilterTag";
import StatusIcon from "../Icon/status-indicator";
// import AutoSize from "../../components/Input/AutoSize";

export default ({ post }) => {
  // const [showComments, setShowComments] = useState(false);
  // const [copied, setCopied] = useState(false);
  // mock API to test functionality
  // const [liked, setLiked] = useState(false);
  // const [shared, setShared] = useState(false);
  // const [comment, setComment] = useState("");
  // const [fakeLikes, setFakeLikes] = useState(post.numLikes);
  // const [fakeComments, setFakeComments] = useState(post.numComments);
  // const [fakeShares, setFakeShares] = useState(post.numShares);

  // const handleComment = (e) => {
  //   e.preventDefault();
  //   const testNewComment = {
  //     _id: 10,
  //     name: "Guest User",
  //     numLikes: 0,
  //     children: [],
  //     comment,
  //   };
  //   post.comments.push(testNewComment); // not good but mocking API and testing UI
  //   setFakeComments(fakeComments + 1);
  //   setShowComments(true);
  //   setComment("");
  // };

  const renderHeader = (
    <Card.Header
      title="Guest User"
      thumb="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSeKU8QNW5Iv71hpiQiVkKPuv6lFvZYC6WBP0oBLM61s9d4KFOq&usqp=CAU"
      extra={
        <span>
          <StatusIcon className="status-icon" />
          {post["Region"]}
        </span>
      }
    />
  );

  const renderContent = (
    <Card.Body>
      <h1>{post["Post Title"]}</h1>
      <p className="post-description">{post["Description"]}</p>
    </Card.Body>
  );

  const renderTags = () => {
    if (post["Type"]) {
      return (
        <Card.Body>
          {post["Type"].map((tag, idx) => (
            <FilterTag label={tag} selected={false} disabled={true} key={idx} />
          ))}
        </Card.Body>
      );
    }
  };

  // const renderViewMore = (
  //   <Card.Body>
  //     <span className="view-more">View More</span>
  //   </Card.Body>
  // );

  // const renderComments = (
  //   <Card.Body>
  //     <AutoSize
  //       placeholder={"Write a comment..."}
  //       onPressEnter={handleComment}
  //       onChange={(e) => setComment(e.target.value)}
  //       value={comment}
  //     />
  //     {showComments ? <Comments comments={post.comments} /> : ""}
  //   </Card.Body>
  // );

  // const renderSocialIcons = (
  //   <Card.Body>
  //     <PostSocial
  //       url={post.url}
  //       liked={liked}
  //       shared={shared}
  //       showComments={showComments}
  //       numLikes={fakeLikes}
  //       numComments={fakeComments}
  //       numShares={fakeShares}
  //       setShowComments={() => setShowComments(!showComments)}
  //       onCopyLink={() => {
  //         if (!shared) setFakeShares(fakeShares + 1);
  //         setShared(true);
  //         return setCopied(!copied);
  //       }}
  //       likePost={() => {
  //         liked ? setFakeLikes(fakeLikes - 1) : setFakeLikes(fakeLikes + 1);
  //         return setLiked(!liked);
  //       }}
  //     />
  //   </Card.Body>
  // );

  // const renderShareModal = (
  //   <Modal
  //     onClose={() => setCopied(!copied)}
  //     maskClosable={true}
  //     closable={true}
  //     visible={copied}
  //     transparent
  //   >
  //     <h1 style={{ color: "black" }}>Link Copied!</h1>
  //   </Modal>
  // );

  return (
    <PostCard>
      {renderHeader}
      <WhiteSpace size="md" />
      {renderTags()}
      <WhiteSpace />
      {renderContent}
      {/* {renderViewMore} */}
      {/* {renderSocialIcons} */}
      {/* {renderComments} */}
      {/* {renderShareModal} */}
    </PostCard>
  );
};
