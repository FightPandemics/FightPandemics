import React, { useState } from "react";
import { Tabs } from "antd";
import { Divider, ModalWrapper } from "components/CreatePost/StyledModal";
import Form from "components/CreatePost/Form/Form";
import EditForm from "components/CreatePost/Form/EditForm";

const { TabPane } = Tabs;

const tabs = [
  {
    key: "offer",
    title: "Offering Help",
    question: "What are you offering?",
  },
  {
    key: "request",
    title: "Requesting Help",
    question: "What do you need?",
  },
];

const ModalComponent = ({
  isAuthenticated,
  setCurrentStep,
  onCancel,
  onClose,
  onSelect,
  loadPost,
  handleEdit,
  fullContent,
  handleCloseEditPost,
  dispatchAction,
  handleEditPost,
  handleFormData,
  renderError,
  setExpiration,
  setShareWith,
  setPostId,
  addTag,
  currentPost,
  user,
}) => {
  const [showModal, setShowModal] = useState(true);
  const closeModal = () => (onClose ? onClose() : setShowModal(false));

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
              <TabPane tab={tab.title} key={tab.key}>
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
              <TabPane tab={tab.title} key={tab.key}>
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
                />
              </TabPane>
            ))}
      </Tabs>
    </ModalWrapper>
  );
};

export default ModalComponent;
