import React, { useState } from "react";
import { Tabs } from "antd";
import createPostSettings from "assets/data/createPostSettings";
import { Divider, ModalWrapper } from "components/CreatePost/StyledModal";
import OfferHelp from "components/CreatePost/Form/OfferHelp";
import AskHelp from "components/CreatePost/Form/AskHelp";

const { shareWith, expires } = createPostSettings;

const { TabPane } = Tabs;

const errorMsg = {
  title: "Please include a title for your post.",
  description: "Please include a description for your post.",
  help: "Please select a type of help.",
  tags: "Please add at least one tag.",
};

const initialState = {
  formData: {
    title: "",
    description: "",
    tags: [],
    shareWith: shareWith,
    expires: expires,
  },
  errors: [],
};

const ModalComponent = ({ setCurrentStep, onClose }) => {
  const [formData, setFormData] = useState(initialState.formData);
  const [errors, setErrors] = useState(initialState.errors);
  const [showModal, setShowModal] = useState(true);

  const cleanForm = () => {
    setFormData(initialState.formData);
  };

  const renderError = (field) => {
    if (errors.includes(field) && (!formData[field] || !formData[field].length))
      return errorMsg[field];
  };

  const populateErrors = () => {
    const newErrors = [];
    for (let field in errorMsg) {
      if (!errors.includes(field)) {
        newErrors.push(field);
      }
    }
    setErrors([...errors, ...newErrors]);
  };

  const handleFormData = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors.includes(field) && formData[field]) {
      const newErrors = errors.filter((error) => error !== field);
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    // This live bellow is there only to show the confirmation modal for testers
    setCurrentStep(4);
    e.preventDefault();
    populateErrors();
    if (!errors.length) {
      // todo: finish integrating api
      try {
        // const req = await axios.post("/api/posts", formData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addTag = (tag) => (e) => {
    const hasTag = formData.tags.includes(tag);
    if (hasTag) {
      const tags = formData.tags.filter((t) => t !== tag);
      setFormData({ ...formData, tags });
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const closeModal = () => {
    if (onClose) {
      onClose();
    } else {
      setShowModal(false);
    }
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
        defaultActiveKey="1"
        onChange={cleanForm}
        tabBarGutter={50}
      >
        <TabPane tab="Offering Help" key="1">
          <OfferHelp
            formData={formData}
            handleSubmit={handleSubmit}
            handleFormData={handleFormData}
            renderError={renderError}
            addTag={addTag}
            selectedTags={formData.tags}
          />
        </TabPane>
        <TabPane tab="Requesting Help" key="2">
          <AskHelp
            formData={formData}
            handleSubmit={handleSubmit}
            handleFormData={handleFormData}
            renderError={renderError}
            addTag={addTag}
            selectedTags={formData.tags}
          />
        </TabPane>
      </Tabs>
    </ModalWrapper>
  );
};

export default ModalComponent;
