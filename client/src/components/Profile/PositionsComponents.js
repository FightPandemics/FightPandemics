import { Drawer } from "antd";
import styled from "styled-components";

import Heading from "../Typography/Heading";
import SvgIcon from "../Icon/SvgIcon";
import TextLabel from "components/Typography/TextLabel";
import { mq, theme } from "../../constants/theme";

const { colors } = theme;

export const CustomDrawer = styled(Drawer)`
  .ant-drawer-content {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  .ant-drawer-body {
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;

export const DrawerHeader = styled.div`
  margin: 2rem 0;
  a[href] {
    color: ${colors.black};
    font-size: 1.7rem;
    display: block;
  }
`;

export const SectionHeader = styled(Heading)`
  &.ant-typography {
    display: flex;
    align-items: center;
    color: ${colors.darkGray};
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 2rem;
    background: transparent;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      background: ${colors.ghostWhite};
    }
  }
`;

export const CreatePostIcon = styled(SvgIcon)`
  position: fixed;
  bottom: 3rem;
  right: 2rem;
  height: 5rem;
  width: 5rem;
  z-index: 1;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
  }
`;
export const CreatePostDiv = styled.div`
  display: none;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    color: ${colors.black};
    display: initial;
    margin-right: 1rem;
  }
`;

export const SocialIcon = styled(SvgIcon)`
  align-self: flex-end;
  width: 3rem;
  height: 3rem;
  margin-right: 1.6rem;
`;

export const NameDiv = styled(TextLabel)`
  /* display: flex;
  width: 100%;
  align-self: flex-start;
  overflow-wrap: break-word;
  padding-left: 16rem;
  justify-content: space-between;

  &.ant-typography {
    font-size: 2.6rem;
    font-weight: bold;
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    padding: 0;
    margin-top: 2.5rem;
    flex-direction: column;
  } */

  /* .name-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  } */

  .address-container {
    color: #939393;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 1.6rem);

    img {
      margin-right: 0.8rem;
    }
  }
`;

export const NamePara = styled.p`
  color: ${colors.white};
  overflow-wrap: break-word;
  margin: 0 !important;
  margin-left: 1rem !important;
  text-align: left;
  max-width: 90%;
  margin-top: 1rem;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    padding: 0;
    font-size: 1.5rem;
    letter-spacing: .1rem;
    line-height: 2.8rem;
  }
`;

export const EditIcon = styled(SvgIcon)`
  color: ${colors.royalBlue};
  align-self: flex-end;
  position: absolute;
  right: 2.8rem;
  top: 2.4rem;
`;

export const PositionsBackgroup = styled.div`
  background-color: ${colors.royalBlue}; 
  width: 100%;
  height: 5.2rem;
  z-index: 0;
  border-radius: 1rem 1rem 0px 0px;
  display: flex;
  align-items: center;
`;

export const CategoryBackgroup = styled.div`
  display: flex;
  align-items: center;
  /* background-color: ${colors.ghostWhite}; */
  width: 100%;
  height: 5.2rem;  
  padding: 1rem 0 1rem 3.3rem;
  border-radius: 0 0 1rem 1rem;
 `;

export const BackgroupContainer = styled.div`
  filter: drop-shadow(0 .5rem 2rem rgba(0, 0, 0, .1)) ;
  `;

export const ProfileLayout = styled.div`
  /* background-color: ${colors.offWhite}; */
  
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    /* background-color: #f6f7fb; */
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.4rem;
  ${(props) => (props.inCard ? `padding-bottom: 2rem;` : "")}
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    flex-direction: ${(props) => (props.inCard ? "row" : "column")};
    justify-content: flex-start;
    align-items: flex-start;
    ${(props) =>
    props.inCard
      ? `
    img {
      width: 2rem;
      height: 2rem;
    }
    `
      : ""};
  }

  .social-icons {
    a:last-child img {
      margin-right: 0;
    }
  }
`;
export const HelpContainer = styled.div`
  display: flex;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin-bottom: 1.6rem;
  }

  & > div {
    background: #f3f4fe;
    border-radius: 4px;
    padding: 0.8rem 2rem;
    color: ${colors.royalBlue};
    margin-right: 0.8rem;
  }
`;

export const UserInfoContainer = styled.div`
  background-color: ${colors.white};
  box-shadow: 0px 0.2rem 2rem rgba(0, 0, 0, 0.01);
  max-width: 80rem;
  width: 100%;
  z-index: 1;
  flex-direction: column;
  display: flex;
  align-items: center;
  border-radius: 0.8rem;
`;

export const AvatarPhotoContainer = styled.fieldset`
  padding: 0;
  padding-left: 2rem;
`;

export const PhotoUploadButton = styled.legend`
  position: absolute;
  bottom: 1rem;
  left: 10.5rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    left: 7.5rem;
  }
`;

export const PlaceholderIcon = styled.div`
  flex: 1;
`;

export const HelpImage = styled.img`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  width: 35%;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
  }
`;
export const UserInfoDesktop = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 2.4rem 2.8rem;
`;

export const DescriptionDesktop = styled.div`
  margin-top: 2.4rem;
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${colors.darkerGray};
`;

export const PositionTitle = styled.h1`
  font-size: 3.2rem;
  line-height: 3.7rem;
  letter-spacing: .04rem;
  font-weight: 600;
  color: ${colors.black};
  align-self: flex-start;
  margin-top: 10rem;
  margin-bottom: 0;
  
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) { 
  margin: 3rem auto 1.6rem auto;
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-weight: 500;
  }

`;

export const PositionDescription = styled.p`
  color: ${colors.mediumGray};
  font-style: 'Work Sans';
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.9rem;
  letter-spacing: .07rem;
  margin-top: 5rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) { 
    font-size: 1.2rem;
    line-height: 1.4rem;
    margin-top: 2rem;
  }
`;

export const PositionLisitingContainer = styled.div`

`;

export const TitleContainer = styled.div`
display: flex;
align-items: center;
left: 0;
margin-bottom: 2.2rem;
`;
export const PageTitle = styled(TextLabel)`
  display: flex;
  width: 100%;
  align-self: flex-start;
  overflow-wrap: break-word;
  padding-left: 1rem;
     

  &.ant-typography {
    font-size: 1.5rem;
    font-weight: 600;
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    padding: 0;
    padding-left: .5rem;
    flex-direction: column;
  }

  .name-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .address-container {
    color: #939393;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 1.6rem);

    img {
      margin-right: 0.8rem;
    }
  }
`;

export const PositionsContainer = styled.div`
    position: relative;
    
  p {
    font-family: 'Work Sans';
    color: ${colors.black};
    font-size: 1.6rem;
    font-weight: 400;
    letter-spacing:.07rem;
    color: ${colors.black};
    
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      font-size: 1.2rem;
  }
  }
`;

export const OrgCategory = styled.div`
  font-family: 'Work Sans';
  font-size: 1.2rem;
  color: ${colors.darkishGray};
  
  `;





