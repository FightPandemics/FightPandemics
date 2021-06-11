import styled from "styled-components";
import { Modal } from "antd";
import { theme } from "constants/theme";

const { colors, typography } = theme;

const OrgBookStyledModalContainer = styled(Modal)`
  font-family: ${typography.font.family.display};
  font-size: ${typography.size.medium};
  font-weight: 600;
  line-height: 2.2rem;
  width: 52rem !important;

  .ant-modal-content {
    width: 100%;
    max-width: 56.4rem;
    max-height: 55.4rem;
    border-radius: 1rem;
  }

  .ant-modal-header {
    height: 5.8rem;
    border-radius: 1rem 1rem 0 0;
    background-color: ${colors.white};

    .ant-modal-title {
      font-size: ${typography.size.xlarge};
      font-weight: bold;
      line-height: 116.8%;
    }
  }

  .ant-modal-body {
    display: flex;
    max-height: ${(props) => props.MaxModalBodyHeight};
    overflow-y: hidden;
    padding: 3.8rem 4rem 4.7rem 4rem;
    min-height: ${(props) => props.MinModalBodyHeight};

    flex-direction: column;
    justify-content: center;
  }

  .ant-form-item-control-input-content {
    flex: auto;
    max-width: 50%;
  }

  .ant-form-item-control-input {
    max-width: 225px;
  }

  .ant-col-24 {
    display: block;
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 80%;
  }

  .ant-row {
    display: flex;
    flex-flow: row nowrap;
  }

  .ant-col {
    flex: 0 0 90%;
    margin: 2rem 0;
  }

  .ant-btn {
    min-width: 15rem;
    max-width: 15rem;
    height: 4.5rem;
    border-radius: 3.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ant-btn-primary {
    color: ${colors.white};
    background-color: ${colors.royalBlue};
  }
`;

export { OrgBookStyledModalContainer };
