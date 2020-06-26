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
  formData,
  handleEdit,
  handleCloseEditPost,
  handleEditPost,
  handleFormData,
  renderError,
  setExpiration,
  setShareWith,
  setPostUrl,
  addTag,
  post,
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
        defaultActiveKey={post ? post.objective : "offer"}
        tabBarGutter={50}
      >
        {post
          ? tabs.map((tab) => (
              <TabPane tab={tab.title} key={tab.key}>
                <EditForm
                  type={tab.key}
                  textData={{ question: tab.question }}
                  onClose={onClose}
                  post={post}
                  user={user}
                  onSelect={handleEditPost}
                  isAuthenticated={isAuthenticated}
                  onCancel={handleCloseEditPost}
                  loadPost={loadPost}
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
                  setPostUrl={setPostUrl}
                />
              </TabPane>
            ))}
      </Tabs>
    </ModalWrapper>
  );
};

export default ModalComponent;
