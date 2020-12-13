import React from "react";
import { Result, Button, Typography } from "antd";

import StyledModal, { StyledButton } from "./StyledModal";

const { Title } = Typography;

function StepModal({
  step,
  header,
  icon,
  body,
  actionText,
  status,
  onNext,
  onCancel,
}) {
  return (
    <StyledModal
      width={"57rem"}
      height={"30rem"}
      footer={null}
      centered
      visible={step}
      onCancel={onCancel}
    >
      {step && (
        <>
          <Title level={5}>{header}</Title>
          <Result
            icon={icon}
            status={status}
            extra={
              <>
                <p>{body}</p>
                <StyledButton onClick={onNext} type="primary">
                  {actionText}
                </StyledButton>
              </>
            }
          />
        </>
      )}
    </StyledModal>
  );
}

export default StepModal;
