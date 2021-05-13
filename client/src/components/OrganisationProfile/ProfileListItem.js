import React from "react";
import styled from "styled-components";
import { theme, mq } from "constants/theme";
import { getInitialsFromFullName } from "utils/userInfo";
import OrgProfileBackup from "assets/icons/org-no-photo-profile.svg";
const { colors } = theme;

export const AllItems = styled.div`
  max-width: 100%;
  width: 100%;
  height: 10rem;
  display: flex;
  margin: 0;

  &.organisation-card {
    height: 10rem;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem 0;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  padding: 0 1rem;
  width: 100%;
  height: 9rem;

  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    &.organisation-card {
    }
  }
`;

export const ProfilePicContainer = styled.div`
  display: flex;
  align-items: center;
  justify-self: flex-start;
  justify-content: center;
  margin: 1rem 0;
  border-radius: 50%;
  border: 0.1rem solid ${colors.royalBlue};
  //   color: ${colors.royalBlue};
  width: 4rem;
  height: 4rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2rem;

  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    &.organisation-card {
      height: 6rem;
      width: 6rem;
      margin: 0;
      margin-left: 3rem;
    }
  }
`;

export const ProfilePic = styled.div`
  font-size: 1.5rem;
  &.organisation-card {
    // margin: 2.9rem 0;
    display: flex;
    justify-content: center;
    height: 6rem;
    object-fit: cover;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  justify-content: center;

  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    &.organisation-card {
      margin-left: 4rem;
    }
  }
`;

export const Name = styled.p`
  color: ${colors.black};
  font-size: 1.6rem;
  line-height: 1.9rem;
  font-weight: 400;
  margin: 0;
`;

export const Title = styled.p`
  font-size: 1rem;
  line-height: 1.8rem;
  color: rgba(0, 0, 0, 0.5);
  color: ${colors.lightishGray};
  opacity: 50%;
  margin: 0;
  margin-top: 1rem;
`;

const ProfileListItem = ({ item, isSelf, type }) => {
  let list;
  if (type != "orgs") {
    list = "applicant";
  }

  if (type == "orgs") {
    list = "organisation";
  }

  return (
    <AllItems className={type == "orgs" ? "organisation-card" : null}>
      <ProfileContainer className={type == "orgs" ? "organisation-card" : null}>
        <ProfilePicContainer
          className={type == "orgs" ? "organisation-card" : null}
        >
          <ProfilePic className={type == "orgs" ? "organisation-card" : null}>
            {item?.[list]?.photo ? (
              <img
                style={{
                  maxWidth: "100%",
                  borderRadius: "50%",
                  boxSizing: "content-box",
                }}
                src={item?.[list]?.photo}
              />
            ) : type == "orgs" ? (
              <img src={OrgProfileBackup} />
            ) : (
              type != "orgs" &&
              ((item?.[list]?.name &&
                getInitialsFromFullName(item?.[list]?.name)) ||
                "")
            )}
          </ProfilePic>
        </ProfilePicContainer>
        <TextContainer className={type == "orgs" ? "organisation-card" : null}>
          <Name>
            {type == "orgs"
              ? item?.[list]?.name
              : (item?.[list]?.name && item?.[list]?.name) || ""}
          </Name>
          {type == "applicant" ? null : (
            <Title>
              {
                //ORG PERMISSIONS OR POSITION TITLE
                type == "orgs"
                  ? // org permissions prop (test placeholder is below)
                    "Your Role: Editor"
                  : // member position title prop (test placeholder is below)
                    "Volunteer"
              }
            </Title>
          )}
        </TextContainer>
      </ProfileContainer>
    </AllItems>
  );
};

export default ProfileListItem;
