import React from "react";
import { useTranslation } from "react-i18next";

import {
  PolicyContainer,
  TextContainer,
} from "components/PolicyPages/PolicyContainer";

import PrivacyPolicyContent from "components/PolicyPages/PrivacyPolicyContent";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <PolicyContainer>
      <TextContainer>
        <h2 className="text-primary display-6">{t("footer.privacyPolicy")}</h2>
        <PrivacyPolicyContent />
      </TextContainer>
    </PolicyContainer>
  );
};

export default PrivacyPolicy;
