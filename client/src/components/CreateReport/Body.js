import React, { useState, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import TagManager from "react-gtm-module";

import Form from "./Form";
import SubTitle from "./SubTitle";
import Options from "./Options";
import SubmitButton from "components/Button/SubmitButton";
import styled from "styled-components";
import BaseButton from "components/Button/BaseButton";
import { theme } from "constants/theme";
import { selectOrganisationId } from "reducers/session";
import GTM from "constants/gtm-tags";

const { colors, typography } = theme;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const CancelButton = styled(BaseButton).attrs(({ size, inline }) => {
  return { size, inline };
})`
  width: 8rem;
  height: 3.5rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  span {
    font-family: ${typography.font.family.display};
    font-style: normal;
    font-size: ${typography.size.medium};
    line-height: 1.15rem;
    font-weight: 500;
    color: ${colors.royalBlue};
  }
  &:hover,
  &:active,
  &:focus {
    &.am-button {
      border: 1px solid blue;
    }
  }
`;

export const Submit = styled(SubmitButton)`
  width: 8rem;
  height: 3.5rem;
  align-self: flex-end;
  line-height: 1.15rem;
  padding: 14px 24px;
  background-color: ${(props) =>
    props.forModerator?.remove ? colors.orangeRed : colors.royalBlue};
  span {
    font-family: ${typography.font.family.display};
    font-style: normal;
    font-size: ${typography.size.medium};
    line-height: 1.15rem;
    font-weight: 500;
  }
`;
const Body = ({
  closeModal,
  postId,
  onSuccess,
  postReportedBy,
  forModerator,
}) => {
  const [reasonData, setReasonData] = useState([]);
  const [description, setDescription] = useState("");
  const actorOrganisationId = useSelector(selectOrganisationId);
  const { t } = useTranslation();

  const addOption = (option) => (e) => {
    const hasOption = reasonData.findIndex((reason) => reason === option);
    if (hasOption < 0) {
      setReasonData([...reasonData, option]);
    } else {
      const filteredData = reasonData.filter((reason) => reason !== option);
      setReasonData(filteredData);
    }
  };

  const addDescription = () => (e) => {
    setDescription(e.target.value);
  };

  const getActorQuery = () =>
    actorOrganisationId ? `?actorId=${actorOrganisationId}` : "";

  const sendData = async (e) => {
    const reasonString = `${reasonData.join("|")}|${description}`;
    const formData = { reason: reasonString };
    const formDataForModerator = {
      justification: reasonString,
      action: forModerator?.keep ? "reject" : "accept",
    };
    e.preventDefault();
    try {
      forModerator
        ? await axios.patch(
            `/api/reports/posts/${postId}${getActorQuery()}`,
            formDataForModerator,
          )
        : await axios.post(
            `/api/reports/posts/${postId}${getActorQuery()}`,
            formData,
          );

      TagManager.dataLayer({
        dataLayer: {
          event: forModerator
            ? forModerator.keep
              ? GTM.moderation.keepPostEventName
              : GTM.moderation.removePostEventName
            : GTM.moderation.reportEventName,
          reasons: reasonData,
        },
      });
      // clear DataLayer
      TagManager.dataLayer({
        dataLayer: {
          event: -1,
          reasons: -1,
        },
      });
      onSuccess(true);
    } catch (error) {
      onSuccess(false);
    }
  };

  return (
    <>
      <Options
        postReportedBy={postReportedBy}
        handleOption={addOption}
        selectedOptions={reasonData}
        forModerator={forModerator}
      />

      {reasonData.includes("Other") || forModerator?.remove ? (
        <>
          <SubTitle title={t("moderation.additionalDetails")} />
          <Form onChangeDescription={addDescription} />
        </>
      ) : null}
      <Footer>
        <CancelButton onClick={closeModal}>
          {t("moderation.cancel")}
        </CancelButton>
        <Submit
          primary="true"
          onClick={sendData}
          disabled={!reasonData.length && !forModerator?.keep}
          forModerator={forModerator}
        >
          {forModerator?.remove
            ? t("moderation.buttonRemove")
            : forModerator?.keep
            ? t("moderation.buttonKeep")
            : t("moderation.report")}
        </Submit>
      </Footer>
    </>
  );
};
export default Body;
