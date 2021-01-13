import React from "react";
import { Result, Typography } from "antd";

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
  t,
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
          <Title level={5}>{t(header)}</Title>
          <Result
            icon={icon}
            status={status}
            extra={
              <>
                <p>{t(body)}</p>
                <StyledButton onClick={onNext} type="primary">
                  {t(actionText)}
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
