import styled from "styled-components";
import { Table } from "antd";
import { RED } from "constants/colors";

const AdDashboard = styled(Table)`
  position: absolute;
  width: 30%;
  top: 12rem;
  left: 20rem;
  padding: 1rem;
  border-radius: 0.2rem;
  .delete {
    font-weight: 700;
    color: ${RED};
  }
`;

export default AdDashboard;
