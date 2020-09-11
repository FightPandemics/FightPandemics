import React from "react";

import {
  PolicyContainer,
  TextContainer,
} from "components/PolicyPages/PolicyContainer";

import PrivacyPolicyContent from "components/PolicyPages/PrivacyPolicyContent";

const PrivacyPolicy = () => {
  return (
    <PolicyContainer>
      <TextContainer>
        <h2 className="text-primary display-6">Privacy Policy</h2>
        <PrivacyPolicyContent />
      </TextContainer>
    </PolicyContainer>
  );
};

export default PrivacyPolicy;
