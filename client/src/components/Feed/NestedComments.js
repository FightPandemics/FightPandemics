import React, { useState } from "react";

import AutoSize from "../../components/Input/AutoSize";
import { Avatar } from "antd";
import { ROYAL_BLUE } from "../../constants/colors";
import StyledComment from "./StyledComment";
import SvgIcon from "../Icon/SvgIcon";
import heartSmall from "~/assets/icons/heart-small.svg";

// ICONS



const clickedTextStyle = { color: ROYAL_BLUE, fontWeight: "bold" };

const NestedComments = ({ comment }) => {
    const [likedComment, setLikedComment] = useState(false);
    const [fakeNumLikes, setFakeNumLikes] = useState(comment.numLikes);
    const [fakeNumReplies, setFakeNumReplies] = useState(comment.children.length);
    const [reply, setReply] = useState("");
    const [showReply, setShowReply] = useState(false);

    const renderAvatar = (
        <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGhWTUkY0xGbbdHyReD6227iz53ADtRmcn1PTN4GUS3clC6MCT&usqp=CAU"
            alt={`${comment.name}`}
        />
    );

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

    const renderNumLikes = () => {
        return fakeNumLikes > 0 ? (
            <span className="comment-likes">
                <SvgIcon src={heartSmall} />
                {fakeNumLikes}
            </span>
        ) : (
            ""
        );
    };

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

    const renderReplyInput = showReply ? (
        <div className="reply-input">
            {renderAvatar}
            <AutoSize
                placeholder={"Write a reply..."}
                onPressEnter={handleReply}
                onChange={(e) => setReply(e.target.value)}
                value={reply}
            />
        </div>
    ) : (
        ""
    );

    const renderReply = () => {
        const style = showReply ? clickedTextStyle : {};
        return (
            <span
                style={style}
                onClick={() => setShowReply(!showReply)}
                key="comment-nested-reply-to"
            >
        Reply
            </span>
        );
    };
    const renderTimeStamp = <span>1w</span>;

    const commentActions = [
        renderTimeStamp,
        renderLikeButton(),
        renderReply(),
        renderNumLikes(),
        renderReplyInput,
    ];

    const nestedComments = (comment.children || []).map((comment) => {
        return <NestedComments comment={comment} key={comment._id} />;
    });

    return (
        <div>
            <StyledComment
                actions={commentActions}
                author={<span>{comment.name}</span>}
                avatar={renderAvatar}
                content={<p>{comment.comment}</p>}
            >
                {nestedComments}
            </StyledComment>
        </div>
    );
};

export default NestedComments;
