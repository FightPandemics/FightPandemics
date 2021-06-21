import React from "react";
import styled from "styled-components";
import { theme, mq } from "constants/theme";
import noJoinOrgPic from "assets/no-org-animal.svg";
import { useTranslation } from "react-i18next";



const NoJoinOrg = ({ isSelf }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <div className="wrapper-content">
        <div className="no-join-org-pic">
          <img src={noJoinOrgPic} alt="no join org pic" />
        </div>
        {isSelf ? <p>{t("profile.individual.noOrgs")}</p> : <p>{t("profile.individual.noOrgsOther")}</p>}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background: ${theme.colors.white};
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.08);
  border-radius: 1.2rem;
  padding: 2rem;

  .wrapper-content {
    margin: 4rem 12rem 10rem 12rem;
  }

  .no-join-org-pic {
    display: flex;
    justify-content: center;
    height: 20rem;
    object-fit: cover;
    margin-bottom: 4rem;
  }
  p {
    display: block;
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    color: ${theme.colors.black};
  }

  //   Mobile
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
    border-radius: 1.2rem;
    .wrapper-content {
      margin: 1rem 2rem 2rem 2rem;
    }
    .no-join-org-pic {
      height: 10rem;
      object-fit: cover;
      margin-bottom: 1rem;
    }
    p {
      font-size: ${theme.typography.size.xsmall};
      line-height: ${theme.typography.size.xsmall};
    }
  }
`;

export default NoJoinOrg;
