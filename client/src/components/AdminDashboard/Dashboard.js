import styled from "styled-components";
import { Table } from "antd";
import { RED } from "constants/colors";

const AdDashboard = styled(Table)`
  padding: 1rem;
  border-radius: 0.2rem;
  .delete {
    font-weight: 700;
    color: ${RED};
  }
`;

export default AdDashboard;
