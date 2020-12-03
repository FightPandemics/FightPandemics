import React, { useState } from "react";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import axios from "axios";

import StepModal from "./StepModal";
import steps from "./steps";

function Banner({}) {
  const [step, setStep] = useState(null);
  const [isInContextUiActive, setIsInContextUiActive] = useState(false);

  const startVerification = () => {
    setStep("start");
  };

  const cancelVerification = () => {
    setStep(null);
  };

  const getSessionUrl = async () => {
    try {
      const res = await axios.get(`/api/users/verify`);
      return launchInContextSession(res.data.sessionUrl)
    } catch (err) {
      console.log(err);
    }
  };

  const launchInContextSession = (sessionUrl) =>{
    const veriffFrame = createVeriffFrame({
      url: sessionUrl || "https://magic.veriff.me/v/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoiYWVmODI5YWYtYTJhOS00NTU1LTg5OTUtY2U5Y2NmZDJlZTExIiwiaWF0IjoxNjA2OTU0OTM5fQ.9lfVX1nj1BEd8XodMXWTU0kVTV49B-0dOGvjhz0C--0",
      // backup url for testing
      onEvent: function (msg) {
        switch (msg) {
          case MESSAGES.STARTED:
            setIsInContextUiActive(true);
            break;
          case MESSAGES.CANCELED:
            setStep("cancel");
            break;
          case MESSAGES.FINISHED:
            setStep("finish");
            break;
        }
      },
    });
  }

  return (
    <>
      <div onClick={() => startVerification()}>
        Verify your account aaaaaaaaaaa
      </div>
      <StepModal
        step={step}
        header={steps[step]?.header}
        icon={steps[step]?.icon}
        status={steps[step]?.status}
        body={steps[step]?.body}
        actionText={steps[step]?.actionText}
        onNext={step === "start" ? getSessionUrl : cancelVerification}
        onCancel={cancelVerification}
        pendingVerification={isInContextUiActive} // if verification is pending, we should hide the StepModal
      />
    </>
  );
}
export default Banner;
