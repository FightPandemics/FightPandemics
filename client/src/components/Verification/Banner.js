import React, { useState } from "react";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import axios from "axios";

import StepModal from "./StepModal";
import steps from "./steps";

function Banner({}) {
  const [step, setStep] = useState(null);

  const startVerification = () => {
    setStep("start");
  };

  const cancelVerification = () => {
    setStep(null);
  };

  const getSessionUrl = async () => {
    try {
      const res = await axios.get(`/api/users/verification`);
      return launchInContextSession(res.data.sessionUrl)
    } catch (err) {
      console.log(err);
    }
  };

  const launchInContextSession = (sessionUrl) =>{
    setStep(null);
    const veriffFrame = createVeriffFrame({
      url: sessionUrl,
      onEvent: function (msg) {
        switch (msg) {
          case MESSAGES.STARTED:
          //
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
      />
    </>
  );
}
export default Banner;
