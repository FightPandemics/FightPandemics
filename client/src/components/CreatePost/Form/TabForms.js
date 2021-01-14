import React, { useState } from "react";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { Divider, ModalWrapper } from "components/CreatePost/StyledModal";
import Form from "components/CreatePost/Form/Form";
import EditForm from "components/CreatePost/Form/EditForm";
import GTM from "constants/gtm-tags";

const { TabPane } = Tabs;

const ModalComponent = ({
  isAuthenticated,
  setCurrentStep,
  onClose,
  loadPost,
  handleEdit,
  fullContent,
  handleCloseEditPost,
  dispatchAction,
  handleEditPost,
  handleFormData,
  renderError,
  setPostId,
  addTag,
  currentPost,
  user,
  gtmTagPrefix,
}) => {
  const { t } = useTranslation();
  // default tabs
  let tabs = [
    {
      key: "offer",
      title: t("post.givingHelp"),
      question: t("post.whatGiving"),
    },
    {
      key: "request",
      title: t("post.gettingHelp"),
      question: t("post.whatNeed"),
    },
  ];

  // if editing post then set tab to show
  if (currentPost.objective === "offer"){
    tabs = [
      {
      key: "offer",
      title: t("post.givingHelp"),
      question: t("post.whatGiving"),
      }
    ]
  } else {
    tabs=[{key: "request",
    title: t("post.gettingHelp"),
    question: t("post.whatNeed"),
    }]
  }

  const [showModal, setShowModal] = useState(true);
  const closeModal = () => (onClose ? onClose() : setShowModal(false));

  const tagsMap = {
    offer: `_${GTM.offerHelp.prefix}`,
    request: `_${GTM.requestHelp.prefix}`,
  };

  return (
    <ModalWrapper
      footer={null}
      visible={showModal}
      destroyOnClose={true}
      onCancel={closeModal}
    >
      <Divider />
      <Tabs
        tabBarStyle={{ color: "#425AF2" }}
        defaultActiveKey={currentPost ? currentPost.objective : "offer"}
        tabBarGutter={50}
      >
        {currentPost
          ? tabs.map((tab) => (
            <TabPane tab={tab.title}>
            <EditForm
              type={tab.key}
              textData={{ question: tab.question }}
              onClose={onClose}
              loadPost={loadPost}
              fullContent={fullContent}
              dispatchAction={dispatchAction}
              currentPost={currentPost}
              user={user}
              onSelect={handleEditPost}
              isAuthenticated={isAuthenticated}
              onCancel={handleCloseEditPost}
            />
          </TabPane>
            ))
          : tabs.map((tab) => (
              <TabPane
                tab={tab.title}
                key={gtmTagPrefix + tagsMap[tab.key]}
                style={{ fontSize: "1.4rem" }}
              >
                <Form
                  type={tab.key}
                  textData={{ question: tab.question }}
                  setCurrentStep={setCurrentStep}
                  handleEdit={handleEdit}
                  handleFormData={handleFormData}
                  renderError={renderError}
                  addTag={addTag}
                  onClose={onClose}
                  setPostId={setPostId}
                  gtmPrefix={gtmTagPrefix + tagsMap[tab.key]}
                />
              </TabPane>
            ))}
      </Tabs>
    </ModalWrapper>
  );
};

export default ModalComponent;
