import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tabs } from "antd-mobile";
import { Button } from "antd";
import { Link } from "react-router-dom";
import PostDropdownButton from "components/Feed/PostDropdownButton";
import DeleteModal from "components/Feed/PostDeleteModal";
import CreateReport from "components/CreateReport/CreateReport";
import { formatDate } from "./utils";
import { isAuthorOrg, isAuthorUser } from "utils/userInfo";
import { selectActorId } from "reducers/session/selectors";
import GTM from "constants/gtm-tags";
import { useTranslation } from "react-i18next";
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
    JSON.parse(localStorage.getItem("hiddenPosts")) || {}
  );
  const [callReport, setCallReport] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [toBeDeletedPost, setToBeDeletedPost] = useState(null);
  const { t } = useTranslation();
  const actorId = useSelector(selectActorId);

  const hidePost = (postId) => {
    localStorage.setItem(
      "hiddenPosts",
      JSON.stringify({ ...hiddenPosts, [postId]: true })
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
                    onDelete={() => {
                      setToBeDeletedPost(post);
                      setDeleteModalVisibility(true);
                    }}
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
      fromPage,
      user,
      isAuthenticated,
      actorId,
      callReport,
      hidePost,
    ]
  );

  return (
    <StyledPostTabCard>
      <StyledCardBody>{content}</StyledCardBody>
      <DeleteModal
        title={t("post.deletePostConfirmationTitle")}
        visible={deleteModalVisibility}
        onOk={() => {
          handlePostDelete(toBeDeletedPost);
          setToBeDeletedPost(null);
          setDeleteModalVisibility(false);
        }}
        onCancel={() => {
          setToBeDeletedPost(null);
          setDeleteModalVisibility(false);
        }}
        okText={t("post.deleteConfirmation")}
        cancelText={t("post.cancel")}
        okButtonProps={{
          id: GTM.post.prefix + GTM.post.delete,
        }}
      >
        <p>{t("post.deletePostConfirmation")}</p>
      </DeleteModal>
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
  initialPage,
  onTabClick,
}) => {
  const tabs = cardContents.map((item) => ({
    title: item.title,
    key: item.title,
    postCount: item.posts.length,
  }));
  const [currentTab, setCurrentTab] = useState({});

  useEffect(() => {
    const initialTab = tabs.find((tab) => tab.title === initialPage);
    setCurrentTab(initialTab);
  }, [cardContents]);

  return (
    <Container>
      <Tabs
        initialPage={initialPage || 0}
        tabs={tabs}
        onTabClick={(tab) => {
          setCurrentTab(tab);
          onTabClick(tab.title);
        }}
      >
        {cardContents.map((tab) => (
          <PostContent
            key={tab.title}
            posts={tab.posts}
            maxPosts={maxPosts}
            user={user}
            handlePostDelete={handlePostDelete}
            isAuthenticated={isAuthenticated}
            fromPage={fromPage}
          />
        ))}
      </Tabs>
      {currentTab.postCount > 0 && (
        <StyledCardFooter>
          <Link
            to={{
              pathname: `/see-all/${user.id}`,
              state: {
                viewType: currentTab.title.toUpperCase(),
                isAuthenticated: isAuthenticated,
              },
            }}
          >
            See All
          </Link>
        </StyledCardFooter>
      )}
    </Container>
  );
};

export default PostTabCard;
