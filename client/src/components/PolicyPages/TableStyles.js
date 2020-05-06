import styled from "styled-components";

import { theme } from "constants/theme";
const { colors } = theme;

export const DataTableHead = styled.thead`
  background-color: ${colors.lightGray};
  border-bottom: 1px solid ${colors.darkGray};
`;

export const TrLine = styled.tr`
  border-bottom: 1px solid ${colors.darkGray};
`;

export const ThLeft = styled.th`
  border-right: 1px solid ${colors.darkGray};
  padding: 0.5rem;
`;

export const ThRight = styled.th`
  padding: 0.5rem;
`;

export const TdLeft = styled.td`
  border-right: 1px solid ${colors.darkGray};
  padding: 0.5rem;
`;

export const TdRight = styled.td`
  padding: 0.5rem;
`;
