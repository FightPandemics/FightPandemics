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

const OFFERING_FORM = "OFFERING_FORM";
const REQUESTING_FORM = "REQUESTING_FORM";

const initialState = {
  currentTab: OFFERING_FORM,
  requestingForm: {
    title: "",
    description: "",
    tags: [],
    shareWith: shareWith,
    expires: expires,
  },
  offeringForm: {
    title: "",
    description: "",
    tags: [],
    shareWith: shareWith,
    expires: expires,
  },
  errors: [],
};

const ModalComponent = ({ setCurrentStep, onClose }) => {
  const [currentTab, setCurrentTab] = useState(initialState.currentTab);
  const [requestingForm, setRequestingFormData] = useState(
    initialState.requestingForm,
  );
  const [offeringForm, setOfferingFormData] = useState(
    initialState.offeringForm,
  );
  const [errors, setErrors] = useState(initialState.errors);
  const [showModal, setShowModal] = useState(true);

  const cleanForm = () => {
    setRequestingFormData(initialState.requestingForm);
    setOfferingFormData(initialState.offeringForm);
  };

  const renderError = (field) => {
    const formData =
      currentTab === OFFERING_FORM ? offeringForm : requestingForm;
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
    currentTab === REQUESTING_FORM
      ? setRequestingFormData({ ...requestingForm, [field]: e.target.value })
      : setOfferingFormData({ ...offeringForm, [field]: e.target.value });

    const formData =
      currentTab === OFFERING_FORM ? offeringForm : requestingForm;

    if (errors.includes(field) && formData[field]) {
      const newErrors = errors.filter((error) => error !== field);
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    console.log(currentTab);
    // This live bellow is there only to show the confirmation modal for testers
    const submitData =
      currentTab === REQUESTING_FORM ? requestingForm : offeringForm;
    console.log(submitData);
    setCurrentStep(4);
    e.preventDefault();
    populateErrors();
    if (!errors.length) {
      // todo: finish integrating api
      try {
        // const req = await axios.post("/api/posts", formData);
        cleanForm();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addTag = (tag) => (e) => {
    const data = currentTab === OFFERING_FORM ? offeringForm : requestingForm;
    const setFormData =
      currentTab === OFFERING_FORM
        ? setOfferingFormData
        : setRequestingFormData;
    const hasTag = data.tags.includes(tag);
    if (hasTag) {
      const tags = data.tags.filter((t) => t !== tag);
      setFormData({ ...data, tags });
    } else {
      setFormData({ ...data, tags: [...data.tags, tag] });
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
        onChange={(key) => setCurrentTab(key)}
        tabBarGutter={50}
      >
        <TabPane tab="Offering Help" key={OFFERING_FORM}>
          <OfferHelp
            formData={offeringForm}
            handleSubmit={handleSubmit}
            handleFormData={handleFormData}
            renderError={renderError}
            addTag={addTag}
            selectedTags={offeringForm.tags}
          />
        </TabPane>
        <TabPane tab="Requesting Help" key={REQUESTING_FORM}>
          <AskHelp
            formData={requestingForm}
            handleSubmit={handleSubmit}
            handleFormData={handleFormData}
            renderError={renderError}
            addTag={addTag}
            selectedTags={requestingForm.tags}
          />
        </TabPane>
      </Tabs>
    </ModalWrapper>
  );
};

export default ModalComponent;
