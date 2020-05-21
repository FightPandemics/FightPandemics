import React, { useState } from "react";
import { Tabs, Input } from "antd";
import styled from "styled-components";
import SvgIcon from "components/Icon/SvgIcon";
import AddTags from "components/Tag/AddTags";
import downArrowSlim from "assets/icons/down-arrow-slim.svg";
import createPostSettings from "assets/data/createPostSettings";
import filterOptions from "assets/data/filterOptions";
import {
  Divider,
  Title,
  Badge,
  SubTitle,
  Section,
  HeadWrapper,
  ModalWrapper,
  Selector,
  Footer,
  Submit,
} from "./StyledModal";

const types = Object.values(filterOptions)[2].options;

const { shareWith, expires } = createPostSettings;

const { TextArea } = Input;

const { TabPane } = Tabs;

const Head = ({ number, title }) => {
  return (
    <HeadWrapper>
      <Badge>
        <span>{number}</span>
      </Badge>
      <Title>{title}</Title>
    </HeadWrapper>
  );
};

const TitleInput = styled(Input)``;

const TextInput = styled(TextArea)`
  border-top: none;
`;

const First = ({
  onChangeTitle,
  onChangeDescription,
  renderError,
  formData,
}) => {
  return (
    <Section>
      <Head number={1} title="Write your post here" />
      <TitleInput
        onChange={onChangeTitle}
        value={formData.title}
        placeholder="Title"
      />
      <TextInput
        onChange={onChangeDescription}
        value={formData.description}
        rows={4}
        placeholder="Write your post"
      />
      <span className="error-box">{renderError("description")}</span>
    </Section>
  );
};

const Second = ({ addTag, title, renderError }) => {
  return (
    <Section>
      <Head number={2} title={title} />
      <div className="tags">
        <AddTags addTag={addTag} filters={types} />
      </div>
      <span className="error-box">{renderError("tags")}</span>
    </Section>
  );
};

const Third = ({ formData }) => {
  const { shareWith, expires } = formData;
  return (
    <Section>
      <Head number={3} title="What is the visibility of your post?" />
      <div className="buttons">
        <SubTitle>The post will be visible to</SubTitle>
        <Selector
          suffixIcon={<SvgIcon src={downArrowSlim} />}
          defaultValue={shareWith.default.value}
          filterOption={false}
          options={shareWith.options}
        />
        <Selector
          suffixIcon={<SvgIcon src={downArrowSlim} />}
          defaultValue={expires.default.value}
          filterOption={false}
          options={expires.options}
        />
      </div>
    </Section>
  );
};

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

const ModalComponent = ({ onClose }) => {
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
          <First
            onChangeTitle={handleFormData("title")}
            onChangeDescription={handleFormData("description")}
            formData={formData}
            renderError={renderError}
          />
          <Second
            addTag={addTag}
            renderError={renderError}
            title="What are you offering"
          />
          <Third formData={formData} />
          <Footer>
            <Submit
              primary="true"
              onClick={handleSubmit}
              disabled={!formData.title || !formData.description}
            >
              Share
            </Submit>
          </Footer>
        </TabPane>
        <TabPane tab="Requesting Help" key="2">
          <First
            onChangeTitle={handleFormData("title")}
            onChangeDescription={handleFormData("description")}
            formData={formData}
            renderError={renderError}
          />
          <Second
            addTag={addTag}
            renderError={renderError}
            title="What do you need?"
          />
          <Third formData={formData} />
          <Footer>
            <Submit
              primary="true"
              onClick={handleSubmit}
              disabled={!formData.title || !formData.description}
            >
              Share
            </Submit>
          </Footer>
        </TabPane>
      </Tabs>
    </ModalWrapper>
  );
};

export default ModalComponent;
