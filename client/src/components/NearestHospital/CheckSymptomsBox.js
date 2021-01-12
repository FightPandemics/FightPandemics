import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GTM from "../../constants/gtm-tags";

import { theme } from "../../constants/theme";
const { colors, typography } = theme;
const { white, black, royalBlue } = colors;
const { large } = typography.size;

const CheckSymptomsBox = styled.div`
  background-color: ${white};
  color: ${black};
  font-size: ${large};
  border: 1px solid rgba(156, 155, 155, 0.27);
  box-sizing: border-box;
  border-radius: 0.2rem;
  padding: 2rem;
  margin-left: 1rem;
  p {
    flex-basis: 47%;
    padding-bottom: 1rem;
    span {
      font-weight: bold;
    }
  }
`;

const SymptomsLink = styled(NavLink)`
  padding: 1rem 1rem;
  background-color: ${royalBlue};
  color: ${white};
  text-decoration: none;
  text-align: center;
  border-radius: 5rem;
  display: block;
  transition: all 0.5s;
  &:hover {
    color: ${white};
    transform: scaleX(1.02);
  }
`;

const CheckSymptoms = (props) => {
  const { t } = useTranslation();

  return (
    <CheckSymptomsBox>
      <div>
        <p>
          <span>{t("nearestHsp.healthEval")}</span>
        </p>
        <p>
          {t("nearestHsp.evalYourHealth")}
          <span>{t("nearestHsp.covid19")}</span>
        </p>
      </div>
      <div>
        <SymptomsLink
          to="/symptoms-check"
          id={GTM.nav.prefix + GTM.nav.checkSymp}
        >
          {t("nearestHsp.chkSymptoms")}
        </SymptomsLink>
      </div>
    </CheckSymptomsBox>
  );
};

export default CheckSymptoms;
