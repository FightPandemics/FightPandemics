import TextAvatar from "components/TextAvatar";
import { mq, theme } from "constants/theme";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getInitialsFromFullName } from "utils/userInfo";

const { royalBlue } = theme.colors;

const { colors } = theme;

export const AllItems = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  margin: 0;

  &.organisation-card {
    height: 6rem;
  }

  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    height: 10rem;
    &.organisation-card {
      height: 10rem;
    }
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem 0;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  height: 6rem;
  background: ${theme.colors.white};

  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    &.organisation-card {
      height: 9rem;
    }
  }
`;

export const ProfilePicContainer = styled.div`
  display: flex;
  align-items: center;
  justify-self: flex-start;
  justify-content: center;
  margin-left: 1rem;
  border-radius: 50%;
  border: 0.1rem solid ${colors.royalBlue};
  width: 4rem;
  height: 4rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2rem;
  span {
    color: ${royalBlue};
  }

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
    display: flex;
    justify-content: center;
    height: 4rem;
    object-fit: cover;
  }

  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    &.organisation-card {
      height: 6rem;
    }
  }
`;

export const OrgTextAvatar = styled(TextAvatar)`
  height: 4rem;
  line-height: 4rem;
  width: 4rem;
  font-size: 2rem;
  margin-right: 0rem;
  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    height: 6rem;
    line-height: 6rem;
    width: 6rem;
    font-size: 2.5rem;
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
  font-size: ${theme.typography.size.small};
  line-height: ${theme.typography.size.small};
  font-weight: 400;
  margin: 0;
  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    font-size: 1.6rem;
    line-height: 1.9rem;
    font-weight: 400;
  }
`;

export const Title = styled.p`
  color: rgba(0, 0, 0, 0.5);
  color: ${colors.lightishGray};
  margin: 0;
  line-height: ${theme.typography.size.xsmall};
  font-size: ${theme.typography.size.xsmall};
  margin-top: 1rem;
  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    line-height: 1.8rem;
    font-size: ${theme.typography.size.medium};
    margin-top: 1rem;
  }
`;

const ProfileListItem = ({ item, isSelf }) => {

  return (
    <AllItems className="organisation-card">
      <ProfileContainer className="organisation-card">
        <ProfilePicContainer
          className={"organisation-card"}
        >
          <ProfilePic className="organisation-card">
            {item?.orgInfo?.photo ? (
              <img
                style={{
                  maxWidth: "100%",
                  borderRadius: "50%",
                  boxSizing: "content-box",
                }}
                src={item?.orgInfo?.photo}
              />
            ) : (
              <OrgTextAvatar>
                {(item?.orgInfo?.name && getInitialsFromFullName(item?.orgInfo?.name)) || ""}
              </OrgTextAvatar>
            )}
          </ProfilePic>
        </ProfilePicContainer>
        <TextContainer className="organisation-card">
          <Name>
           <Link to={`/organisation/${item?.organization?.id}`}>{item?.orgInfo?.name}</Link>
          </Name>
          {/* {!isSelf ? null : (
            <Title>
              {item?.organization?.permissions}
            </Title>
          )} */}
        </TextContainer>
      </ProfileContainer>
    </AllItems>
  );
};

export default ProfileListItem;
