import React from "react";
// assets
import { ReactComponent as VerifySvg } from "assets/verification/verify.svg";

export default {
  start: {
    icon: <VerifySvg />,
    header: "verification.stepStartTitle",
    body: "verification.stepStartBody",
    actionText: "verification.stepStartAction",
  },
  finish: {
    icon: null,
    status: "success",
    header: "verification.stepSuccessTitle",
    body: "verification.stepSuccessBody",
    actionText: "verification.stepSuccessAction",
  },
  cancel: {
    icon: null,
    status: "error",
    header: "verification.stepCancelTitle",
    body: "verification.stepCancelBody",
    actionText: "verification.stepCancelAction",
  },
};
