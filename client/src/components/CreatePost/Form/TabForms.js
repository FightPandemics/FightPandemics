import React, { useState } from "react";
import { Tabs } from "antd";
import { Divider, ModalWrapper } from "components/CreatePost/StyledModal";
import Form from "components/CreatePost/Form/Form";

const { TabPane } = Tabs;

const tabs = [
  {
    key: "OFFERING_FORM",
    title: "Offering Help",
    question: "What are you offering?",
  },
  {
    key: "REQUESTING_FORM",
    title: "Requesting Help",
    question: "What do you need?",
  },
];

const ModalComponent = ({ setCurrentStep, onClose }) => {
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
        defaultActiveKey="OFFERING_FORM"
        onChange={() => {}}
        tabBarGutter={50}
      >
        {tabs.map((tab) => (
          <TabPane tab={tab.title} key={tab.key}>
            <Form
              textData={{ question: tab.question }}
              setCurrentStep={setCurrentStep}
            />
          </TabPane>
        ))}
      </Tabs>
    </ModalWrapper>
  );
};

export default ModalComponent;
