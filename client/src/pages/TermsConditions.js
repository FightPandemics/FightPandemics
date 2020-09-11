import React from "react";

import {
  PolicyContainer,
  TextContainer,
} from "components/PolicyPages/PolicyContainer";
import TermsConditionsContent from "components/PolicyPages/TermsConditionsContent";

const TermsConditions = () => {
  return (
    <PolicyContainer>
      <TextContainer>
        <h2 className="text-primary display-6">Terms & Conditions</h2>
        <TermsConditionsContent />
      </TextContainer>
    </PolicyContainer>
  );
};

export default TermsConditions;
