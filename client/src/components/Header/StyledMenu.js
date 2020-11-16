import { Menu } from "antd";
import styled from "styled-components";
import { theme } from "../../constants/theme";
const { colors } = theme;

const StyledMenu = styled(Menu)`
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05) !important;
  border-radius: 10px;
  width: 19rem;
  transition: height 0.5s ease-out;
  li,
  li a {
    &:hover {
      color: ${colors.royalBlue};
    }
  }
`;

export default StyledMenu;
