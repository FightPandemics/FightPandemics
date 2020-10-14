// Core
import React, { useState } from "react";
import axios from "axios";
import { Avatar, Input, Tooltip, Space } from "antd";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Local
import AutoSize from "components/Input/AutoSize";
import Loader from "components/Feed/StyledLoader";
import StyledComment from "./StyledComment";
import { StyledCommentButton } from "./StyledCommentButton";
import { translateISOTimeTitle } from "assets/data/formToPostMappings";
import { authorProfileLink } from "./utils";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import heartSmall from "assets/icons/heart-small.svg";

// Constants
import { theme } from "constants/theme";

import { SET_COMMENT } from "hooks/actions/postActions";

const { lighterGray, royalBlue } = theme.colors;
const clickedTextStyle = { color: royalBlue, fontWeight: "bold" };

const { TextArea } = Input;
const TextInput = styled(TextArea)`
  background-color: ${lighterGray};
  border: none;
  display: block;
  resize: none;
  *:focus {
    outline: none;
  }
`;

const NestedComments = ({
  user,
  isAuthenticated,
  comment,
  dispatchPostAction,
  deleteComment,
}) => {
  const { t } = useTranslation();
  const [likedComment, setLikedComment] = useState(false);
  const [fakeNumLikes, setFakeNumLikes] = useState(comment.numLikes);
  const [fakeNumReplies, setFakeNumReplies] = useState(0);
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);

  const renderAvatar = (
    <Avatar
      src={
        comment.author.photo
          ? comment.author.photo
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGhWTUkY0xGbbdHyReD6227iz53ADtRmcn1PTN4GUS3clC6MCT&usqp=CAU"
      }
      alt={`${comment.author.name}`}
    />
  );

  //TODO: Add comment replies, like button and number of likes.

  const handleLikeComment = () => {
    likedComment
      ? setFakeNumLikes(fakeNumLikes - 1)
      : setFakeNumLikes(fakeNumLikes + 1);
    setLikedComment(!likedComment);
  };

  const renderLikeButton = () => {
    const style = likedComment ? clickedTextStyle : {};
    return (
      <span style={style} onClick={handleLikeComment} key="comment-basic-like">
        Like
      </span>
    );
  };

  // const renderNumLikes = () => {
  //   return fakeNumLikes > 0 ? (
  //     <span className="comment-likes">
  //       <SvgIcon src={heartSmall} />
  //       {fakeNumLikes}
  //     </span>
  //   ) : (
  //     ""
  //   );
  // };

  const handleReply = (e) => {
    e.preventDefault();
    const testNewReply = {
      _id: 10,
      name: "Guest User",
      numLikes: 0,
      children: [],
      comment: reply,
    };
    comment.children.push(testNewReply); // not good but mocking API and testing UI
    setFakeNumReplies(fakeNumReplies + 1);
    setShowReply(!showReply);
    setReply("");
  };

  // const renderReplyInput = showReply ? (
  //   <div className="reply-input">
  //     {renderAvatar}
  //     {isAuthenticated ? (
  //       <AutoSize
  //         placeholder={"Write a reply..."}
  //         onPressEnter={handleReply}
  //         onChange={(e) => setReply(e.target.value)}
  //         value={reply}
  //       />
  //     ) : (
  //       ""
  //     )}
  //   </div>
  // ) : (
  //   ""
  // );

  // const renderReply = () => {
  //   const style = showReply ? clickedTextStyle : {};
  //   return (
  //     <span
  //       style={style}
  //       onClick={() => setShowReply(!showReply)}
  //       key="comment-nested-reply-to"
  //     >
  //       Reply
  //     </span>
  //   );
  // };

  const nestedComments = (comment.children || []).map((comment) => {
    return <NestedComments comment={comment} key={comment._id} />;
  });

  const handleCommentEdit = (e) => {
    setEditedComment(e.target.value);
  };

  const handleSubmit = async () => {
    let response;
    const { _id: commentId, postId } = comment;
    const payload = { content: editedComment };

    if (isAuthenticated && comment.author.id === user.id) {
      const endPoint = `/api/posts/${postId}/comments/${commentId}`;

      try {
        response = await axios.patch(endPoint, payload);
        if (response && response.data) {
          dispatchPostAction(
            SET_COMMENT,
            "commentId",
            commentId,
            "comment",
            response.data,
          );
          setEditComment(!editComment);
        }
      } catch (error) {
        console.log({ error });
        setEditComment(!editComment);
        setEditedComment("");
      }
    }
  };

  const handleDeleteComment = (e) => {
    e.target.blur();
    deleteComment(comment);
  };

  const toggleEditComment = () => {
    setEditComment(!editComment);
  };

  const commentActions = [
    <Space size="small">
      <StyledCommentButton
        size="small"
        ghost
        onClick={() => toggleEditComment()}
      >
        {t("comment.edit")}
      </StyledCommentButton>
      <StyledCommentButton
        size="small"
        ghost
        onClick={(e) => handleDeleteComment(e)}
      >
        {t("comment.delete")}
      </StyledCommentButton>
    </Space>,
  ];

  const editCommentContent = (
    <>
      {isAuthenticated && comment.author.id === user.id && (
        <>
          <TextInput
            onChange={handleCommentEdit}
            value={editedComment}
            autoSize={{ minRows: 2 }}
          />
          <Space direction="vertical">
            <span></span>
            <StyledCommentButton
              size="small"
              ghost
              onClick={() => handleSubmit()}
            >
              {t("comment.save")}
            </StyledCommentButton>
          </Space>
        </>
      )}
    </>
  );

  const renderCommentContent = (
    <Space direction="vertical">
      <span>{editedComment}</span>
      {isAuthenticated && comment.author.id === user.id && (
        <span>{commentActions}</span>
      )}
    </Space>
  );

  return (
    <div>
      {comment ? (
        <StyledComment
          datetime={
            <>
              <Tooltip title={translateISOTimeTitle(comment.createdAt)}>
                <span>
                  {t(`relativeTime.${comment?.elapsedTimeText.created.unit}WithCount`, {
                    count: comment?.elapsedTimeText.created.count,
                  })}
                  {comment?.elapsedTimeText.isEdited && (` · ${t('post.edited')}`)}
                </span>
              </Tooltip>
            </>
          }
          author={
            <Link to={authorProfileLink(comment)}>{comment.author.name}</Link>
          }
          avatar={<Link to={authorProfileLink(comment)}>{renderAvatar}</Link>}
          content={editComment ? editCommentContent : renderCommentContent}
        ></StyledComment>
      ) : (
        <Loader />
      )}
    </div>
  );
};

const mapStateToProps = ({ session }) => {
  return {
    isAuthenticated: session.isAuthenticated,
  };
};

export default connect(mapStateToProps)(NestedComments);
