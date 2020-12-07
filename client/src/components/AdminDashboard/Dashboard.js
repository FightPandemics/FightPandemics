import styled from "styled-components";
import { Table } from "antd";
import { RED, DARK_GRAY } from "constants/colors";

const AdDashboard = styled(Table)`
  padding: 1rem;
  border-radius: 0.2rem;
  .delete {
    font-weight: 700;
    color: ${RED};
    font-size: 3rem;
    width: 100%;
    text-align: center;
  }
  small {
    display: block;
    color: ${DARK_GRAY};
    margin-left: 5rem;
  }
`;

export default AdDashboard;
