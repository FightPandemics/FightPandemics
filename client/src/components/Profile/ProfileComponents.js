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
`;

export const DrawerHeader = styled.div`
  margin: 2rem 0;
  a[href] {
    color: ${colors.black};
    font-size: 1.7rem;
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
      background: #f5f5f9;
    }
  }
`;

export const EditEmptyIcon = styled(SvgIcon)`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: initial;
    float: right;
    margin-right: 1.5rem;
    width: 2rem;
  }
`;
export const CreatePostIcon = styled(SvgIcon)`
  position: fixed;
  z-index: 1;
  bottom: 5%;
  right: 5%;
  height: 5rem;
  width: 5rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    width: 5rem;
    position: initial;
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
export const LocationIcon = styled(SvgIcon)`
  display: none;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: initial;
    margin-right: 0.5rem;
  }
`;

export const SocialIcon = styled(SvgIcon)`
  align-self: flex-end;
  width: 2rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    width: 2.5rem;
    margin: 0 1rem 0.5rem 0;
  }
`;

export const NameDiv = styled(TextLabel)`
  display: flex;
  width: 100%;
  align-self: flex-start;
  overflow-wrap: break-word;
  padding-left: 16rem;
  justify-content: space-between;

  &.ant-typography {
    font-size: 3rem;
    font-weight: bold;
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    padding: 0;
    margin-top: 2.5rem;
    flex-direction: column;
  }
`;

export const NamePara = styled.p`
  overflow-wrap: break-word;
  margin: 0 !important;
  text-align: left;
  max-width: 90%;
  margin-top: 1rem;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    padding: 0;
    font-size: 2.2rem;
    line-height: 2.8rem;
  }
`;

export const LocationMobileDiv = styled(TextLabel)`
  align-self: center;
  color: ${colors.darkGray};
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
  }
`;
export const LocationDesktopDiv = styled(TextLabel)`
  display: none;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: initial;
    margin-top: 1rem;
    align-self: flex-start;
    &.ant-typography {
      color: ${colors.darkGray};
    }
  }
`;
export const EditIcon = styled(SvgIcon)`
  color: ${colors.royalBlue};
  align-self: flex-end;
  position: absolute;
  right: 2.8rem;
  top: 2.4rem;
`;

export const MenuIcon = styled(SvgIcon)`
  color: ${colors.white};
  margin-right: 2rem;
  margin-top: 3rem;
  float: right;
`;
export const BackgroundHeader = styled.div`
  height: 23vh;
  left: 0;
  right: 0;
  background-color: ${colors.royalBlue};
  border-bottom-right-radius: 3rem;
  position: relative;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
    margin-bottom: 10rem;
  }
`;

export const ProfileBackgroup = styled.div`
  background-color: ${colors.royalBlue};
  position: absolute;
  top: 6rem;
  left: 0;
  width: 100vw;
  height: 21rem;
  z-index: 0;
  border-radius: 0px 0px 6rem 0px;
`;
export const DescriptionMobile = styled.div`
  background-color: ${colors.white};
  border-radius: 0.5rem;
  width: 100%;
  font-size: 1.2rem;
  color: ${colors.darkGray};
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
  }
`;
export const ProfileLayout = styled.div`
  background-color: #fbfbfd;
  max-height: 100%;
  z-index: 1;
  max-width: 80rem;
  padding: 0;
  margin-top: 12.1rem;
  width: 100vw;
  border-radius: 0.8rem;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 90vw;
    margin-left: auto;
    margin-right: auto;
    background-color: #f6f7fb;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.4rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
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
  position: relative;
  border-radius: 0.8rem;
`;

export const AvatarPhotoContainer = styled.fieldset`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(2.8rem, -50%);
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
  color: #282828;
`;
