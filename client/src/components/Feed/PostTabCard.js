import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Tabs } from "antd-mobile";
import { Button } from "antd";
import PostDropdownButton from "components/Feed/PostDropdownButton";
import CreateReport from "components/CreateReport/CreateReport";
import { formatDate } from "./utils";
import { isAuthorOrg, isAuthorUser } from "utils/userInfo";
import { selectActorId } from "reducers/session/selectors";
import {
  StyledPostTabCard,
  StyledCardHeader,
  StyledCardBody,
  StyledUpdateAt,
  StyledTitlePostCard,
  StyledDescription,
  LineBreak,
  Container,
  StyledCardFooter,
  StyledDropDown,
} from "./StyledPostTabCard";

const CONTENT_LENGTH = 56;

const PostContent = ({
  posts,
  user,
  maxPosts,
  handlePostDelete,
  isAuthenticated,
  fromPage,
}) => {
  const [hiddenPosts, setHiddenPosts] = useState(
    JSON.parse(localStorage.getItem("hiddenPosts")) || {},
  );
  const [callReport, setCallReport] = useState(false);
  const actorId = useSelector(selectActorId);

  const hidePost = (postId) => {
    localStorage.setItem(
      "hiddenPosts",
      JSON.stringify({ ...hiddenPosts, [postId]: true }),
    ); // objects are fast, better than looking for postId in an Array
    setHiddenPosts({ ...hiddenPosts, [postId]: true });
  };

  const content = useMemo(
    () =>
      posts
        .filter((post) => !hiddenPosts[post._id])
        .slice(0, maxPosts)
        .map((post) => {
          let finalContent = post.content;
          if (finalContent.length > CONTENT_LENGTH) {
            finalContent = `${finalContent.substring(0, CONTENT_LENGTH)}...`;
          }

          return (
            <div key={post.id}>
              <StyledCardHeader>
                <StyledUpdateAt> {formatDate(post.updatedAt)} </StyledUpdateAt>
                <StyledDropDown className="card-submenu">
                  <PostDropdownButton
                    onHide={() => hidePost(post._id)}
                    onReport={() => setCallReport(true)}
                    onDelete={handlePostDelete}
                    fromPage={fromPage}
                    post={post}
                    user={user}
                    isSelf={isAuthenticated && actorId === post.author.id}
                    isOwner={
                      isAuthenticated &&
                      (isAuthorUser(user, post) ||
                        isAuthorOrg(user?.organisations, post.author))
                    }
                  />
                </StyledDropDown>
              </StyledCardHeader>
              <StyledTitlePostCard>{post.title}</StyledTitlePostCard>
              <StyledDescription>{finalContent}</StyledDescription>
              <LineBreak />
              {callReport ? (
                <CreateReport
                  callReport={callReport}
                  setCallReport={setCallReport}
                  postId={post._id}
                />
              ) : null}
            </div>
          );
        }),
    [
      posts,
      maxPosts,
      hiddenPosts,
      handlePostDelete,
      fromPage,
      user,
      isAuthenticated,
      actorId,
      callReport,
      hidePost,
    ],
  );

  return (
    <StyledPostTabCard>
      <StyledCardBody>{content}</StyledCardBody>
    </StyledPostTabCard>
  );
};

// Display the content of a single PostTabCard (mobile version)
const PostTabCard = ({
  cardContents,
  maxPosts = 3,
  user,
  fromPage = true,
  handlePostDelete,
  isAuthenticated,
}) => {
  const tabs = cardContents.map((item) => ({ title: item.title }));
  return (
    <Container>
      <Tabs tabs={tabs} initialPage={1}>
        {cardContents.map((tab) => (
          <PostContent
            posts={tab.posts}
            maxPosts={maxPosts}
            user={user}
            handlePostDelete={handlePostDelete}
            isAuthenticated={isAuthenticated}
            fromPage={fromPage}
          />
        ))}
      </Tabs>
      <StyledCardFooter>
        <Button type="link">See All</Button>
      </StyledCardFooter>
    </Container>
  );
};

export default PostTabCard;
