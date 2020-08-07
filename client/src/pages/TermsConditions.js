import React from "react";
import { useTranslation } from "react-i18next";

import {
  PolicyContainer,
  TextContainer,
} from "components/PolicyPages/PolicyContainer";
import TermsConditionsContent from "components/PolicyPages/TermsConditionsContent";

const TermsConditions = () => {
  const { t } = useTranslation();

  return (
    <PolicyContainer>
      <TextContainer>
        <h2 className="text-primary display-6">{t("footer.termsConditions")}</h2>
        <TermsConditionsContent />
      </TextContainer>
    </PolicyContainer>
  );
};

export default TermsConditions;
