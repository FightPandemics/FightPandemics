import React from "react";
import steps from "./steps";
import GTM from "constants/gtm-tags";
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
  gtmPrefix,
  t,
}) {
  return (
    <StyledModal
      width={"57rem"}
      height={"30rem"}
      footer={null}
      centered
      visible={step}
      id={gtmPrefix + GTM.profile.verifyPopup}
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
                <StyledButton
                  id={gtmPrefix + GTM.profile[steps[step]?.tag]}
                  onClick={onNext}
                  type="primary"
                >
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
