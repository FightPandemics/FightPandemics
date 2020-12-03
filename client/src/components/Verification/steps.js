import React from "react";
// assets
import { ReactComponent as VerifySvg } from "assets/verification/verify.svg";

export default {
  start: {
    icon: <VerifySvg />,
    header: "Verify your account with Veriff",
    body:
      "Detailed description of verification with Veriff and why it’s important to verify your account with Fight Pandemics.",
    actionText: "Start",
  },
  finish: {
    icon: null,
    status: "success",
    header: "Verify your account with Veriff",
    body:
      "Detailed description of verification with Veriff and why it’s important to verify your account with Fight Pandemics.",
    actionText: "Check my Badge",
  },
  cancel: {
    icon: null,
    status: "error",
    header: "You canceled the verification process",
    body:
      "Detailed description of verification with Veriff and why it’s important to verify your account with Fight Pandemics.",
    actionText: "Close",
  },
};
