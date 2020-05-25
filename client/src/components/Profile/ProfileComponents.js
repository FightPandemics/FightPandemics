import styled from "styled-components";
import Heading from "../Typography/Heading";
import SvgIcon from "../Icon/SvgIcon";
import { Drawer } from "antd";
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
  }
`;

export const EditEmptyIcon = styled(SvgIcon)`
  display: none;
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
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    bottom: 0;
    right: 0;
    width: 4.2rem;
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

export const LinkedinBlueIcon = styled(SvgIcon)`
  align-self: flex-end;
  width: 2rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    width: 2.5rem;
    margin: 0;
    margin-bottom: 0.5rem;
    margin-right: 1rem;
  }
`;

export const TwitterBlueIcon = styled(SvgIcon)`
  align-self: flex-end;
  width: 2rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    margin: 0;
    width: 2.5rem;
    margin-bottom: 0.5rem;
    margin-right: 1rem;
  }
`;

export const NameDiv = styled(TextLabel)`
  align-self: center;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    width: 100%;
    align-self: flex-start;
    &.ant-typography {
      font-size: 3rem;
      font-weight: bold;
    }
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
  margin-right: 2rem;
  margin-top: 2rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
  }
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
  border-bottom-right-radius: 30px;
  position: relative;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
    margin-bottom: 100px;
  }
`;
export const DescriptionMobile = styled.div`
  background-color: ${colors.white};
  borderradius: 5px;
  width: 100%;
  font-size: 1.2rem;
  color: ${colors.darkGray};
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
  }
`;
export const ProfileLayout = styled.div`
  background-color: ${colors.lighterGray};
  max-height: 100%;
  margin: 0 -25px;
  flex-direction: row;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    padding: 0 15%;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    justify-content: initial;
  }
`;
export const HelpContainer = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  width: 30%;
  border: 0.1rem solid #6c80ff;
  border-radius: 0.2rem;
  text-align: center;
  align-items: center;
  margin-left: 1rem;
  margin-bottom: 1rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
    border: transparent;
    width: 100%;
    margin-left: 0;
  }
`;

export const UserInfoContainer = styled.div`
  background-color: ${colors.white};
  margin-top: -13vh;
  margin-left: 2.5rem;
  margin-right: 2.5rem;
  border-radius: 10px;
  z-index: 1;
  filter: drop-shadow(#00000012 5px 0px 5px);
  flex-direction: column;
  display: flex;
  align-items: center;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    z-index: 0;
    margin-top: 0rem;
    padding-top: 5rem;
    border-radius: 0;
    background-color: transparent;
    align-items: initial;
    flex-direction: row;
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
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    width: 60%;
  }
`;

export const DescriptionDesktop = styled.div`
  display: none;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: initial;
    color: ${colors.darkGray};
  }
`;
