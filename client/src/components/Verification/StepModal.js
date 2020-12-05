import React from "react";
import { Result, Modal, Button, Typography } from "antd";

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
    <Modal
      width={"57rem"}
      height={"35rem"}
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
                <Button onClick={onNext} type="primary">
                  {actionText}
                </Button>
              </>
            }
          />
        </>
      )}
    </Modal>
  );
}

export default StepModal;
