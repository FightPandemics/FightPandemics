import styled from "styled-components";
import { Modal } from "antd-mobile";
import { theme } from "../../constants/theme";

const { royalBlue, white } = theme.colors;
const RatingModal = styled(Modal)`
  font-family: ${theme.typography.font.family.display};
  width: 80vw;
  @media screen and (min-width: 1024px) {
    width: 29vw;
  }
  .title {
    font-weight: bold;
    margin: 2rem 3rem 2rem;
    @media screen and (min-width: 1024px) {
      font-size: 2.2rem;
    }
  }
  .rectangle {
    @media screen and (min-width: 1024px) {
      width: 24vw;
    }
    width: 69vw;
    height: 5rem;
    display: inline-flex;
    background: #f3f4fe;
    border: 0.05rem solid ${royalBlue};
    box-sizing: border-box;
    border-radius: 0.3rem;
    div {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: ${royalBlue};
      border-right: 0.05rem solid ${royalBlue};
      &:hover,
      &:active,
      &:focus {
        background-color: ${royalBlue};
        color: ${white};
      }
      &:last-child {
        border-right: none !important;
      }
    }
  }
  .scale-text {
    font-weight: 500;
    font-size: 1.1rem;
    color: ${royalBlue};
    width: 69vw;
    @media screen and (min-width: 1024px) {
      width: 24vw;
    }
    display: inline-flex;
    margin-bottom: 2rem;
  }
  .spacer {
    visibility: hidden;
    flex-grow: 1;
  }
`;

export default RatingModal;