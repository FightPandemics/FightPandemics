import React from "react";
import { useTranslation } from "react-i18next";
import ButtonTag from "components/Tag/ButtonTag";
import { Section } from "components/CreatePost/StyledModal";
import { WhiteSpace } from "antd-mobile";
import SubTitle from "./SubTitle";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { xsmall } = theme.typography.size;
const { royalBlue, selago } = theme.colors;

const DescriptionTag = styled.span`
  line-height: 2.5rem;
  margin: 0.5rem 0.3rem;
  padding: 0.5rem 1.5rem;
  font-size: 1.3rem;
  display: inline-block;
  width: 100%;
  background: ${selago};
  border-radius: 4px;
  font-family: "Work Sans";
  font-weight: 400;
  -webkit-text-stroke: 0.2px;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    line-height: 1.9rem;
    margin: 0.5rem 0.3rem;
    padding: 0.7rem 1rem;
  }
`;

const ReasonTag = styled.span`
  line-height: 2.5rem;
  margin: 0.5rem 0.3rem;
  padding: 0 1rem;
  font-size: ${xsmall};
  display: inline-block;
  white-space: nowrap;
  color: ${royalBlue};
  background: ${selago};
  border-radius: 4rem !important;
  font-family: "Work Sans";
  font-weight: 400;
  -webkit-text-stroke: 0.2px;
  align-items: center;
  position: relative;
  text-align: center;
`;

const Options = ({
  handleOption,
  selectedOptions,
  postReportedBy,
  forModerator,
}) => {
  const { t } = useTranslation();
  const options = [
    {
      stateKey: "Spam",
      value: "moderation.spam",
    },
    {
      stateKey: "Inappropriate Content",
      value: "moderation.inappropriateContent",
    },
    {
      stateKey: "Violates Terms",
      value: "moderation.violatesTerms",
    },
    {
      stateKey: "Other",
      value: "moderation.other",
    },
  ];

  const renderTags = (
    <>
      {postReportedBy &&
        postReportedBy
          .map((report) => report?.reason)
          .join("|")
          .split("|")
          .filter((e) => options.map((reason) => reason.stateKey).includes(e))
          .map((reason, idx) => (
            <ReasonTag key={idx} disabled={true} selected={false}>
              {reason}
            </ReasonTag>
          ))}
    </>
  );

  const renderDescription = (
    <>
      {postReportedBy &&
        postReportedBy
          .map((report) => report?.reason)
          .join("|")
          .split("|")
          .filter((e) => !options.map((reason) => reason.stateKey).includes(e))}
    </>
  );

  const renderOptions = (
    <div className="tags">
      {options.map((option, idx) => (
        <ButtonTag
          className={`tag-selectable
            ${
              selectedOptions.length &&
              selectedOptions.includes(option.stateKey)
                ? "tag-selected"
                : ""
            }`}
          onClick={handleOption(option.stateKey)}
          label={t(option.value)}
          key={idx}
        >
          {t(option.value)}
        </ButtonTag>
      ))}
    </div>
  );

  const subTitle = forModerator
    ? t("moderation.userReported")
    : t("moderation.reason");

  return (
    <Section>
      <div className="tags">
        {forModerator?.remove ? (
          <>
            <SubTitle title={subTitle} />
            <WhiteSpace size="md" />
            {renderTags}
            <WhiteSpace />
            {renderDescription.props.children[0].length ? (
              <>
                <SubTitle title={t("moderation.reportDetails")} />
                <DescriptionTag>{renderDescription}</DescriptionTag>
              </>
            ) : null}
            <SubTitle title={t("moderation.removeReason")} />
            {renderOptions}
          </>
        ) : forModerator?.keep ? (
          <SubTitle title={t("moderation.keepPostConfirm")} />
        ) : (
          <>
            <SubTitle title={subTitle} />
            <>{renderOptions}</>
          </>
        )}
      </div>
    </Section>
  );
};

export default Options;
