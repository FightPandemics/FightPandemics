import React from "react";
import { Trans, useTranslation } from "react-i18next";

import { Paragraph } from "components/PolicyPages/PolicyContainer";
import { ListNoIndent } from "components/PolicyPages/ListStyles";
import { TermsLink } from "components/PolicyPages/TermsLink";
import { Date } from "components/PolicyPages/Date";
import {
  DataTableHead,
  TrLine,
  ThLeft,
  ThRight,
  TdLeft,
  TdRight,
} from "components/PolicyPages/TableStyles";

const PrivacyPolicyContent = () => {
  const { t } = useTranslation();

  return (
    <>
      <Paragraph>
        <Trans i18nKey="privacy.content.0" components={[<strong/>, <strong/>, <strong/>, <strong/>, <strong/>]}></Trans>
      </Paragraph>
      <Paragraph>
        {t("privacy.content.1")}
      </Paragraph>
      <Paragraph>
        <Trans i18nKey="privacy.content.2" components={[<strong/>]}></Trans>
      </Paragraph>
      <Paragraph>
        {t("privacy.content.3")}
      </Paragraph>
      <ol>
        <li>
          <strong>{t("privacy.content.4")}</strong>
          <Paragraph>
            {t("privacy.content.5")}
          </Paragraph>
          <Paragraph>
            <Trans i18nKey="privacy.content.6" components={[<TermsLink href="mailto:legal@fightpandemics.com"/>]}></Trans>
          </Paragraph>
        </li>
        <li>
          <strong>{t("privacy.content.7")}</strong>
          <Paragraph>
            {t("privacy.content.8")}
            <ListNoIndent type="a">
              <li>
                <Trans i18nKey="privacy.content.9" components={[<u/>]}></Trans>
              </li>
              <li>
                <Trans i18nKey="privacy.content.10" components={[<u/>]}></Trans>
              </li>
              <li>
                <Trans i18nKey="privacy.content.11" components={[<u/>]}></Trans>
              </li>
              <li>
                <Trans i18nKey="privacy.content.12" components={[<u/>]}></Trans>
              </li>
              <li>
                <Trans i18nKey="privacy.content.13" components={[<u/>]}></Trans>
              </li>
              <li>
                <Trans i18nKey="privacy.content.14" components={[<u/>]}></Trans>
              </li>
              <li>
                <Trans i18nKey="privacy.content.15" components={[<u/>]}></Trans>
              </li>
            </ListNoIndent>
          </Paragraph>
        </li>
        <li>
          <Trans i18nKey="privacy.content.16" components={[<strong/>, <Paragraph/>, <Paragraph/>]}></Trans>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey="privacy.content.17" components={[<TermsLink href="mailto:legal@fightpandemics.com"/>]}></Trans>
          </Paragraph>
          <Paragraph>
            {t("privacy.content.18")}
          </Paragraph>
        </li>
        <li>
          <Trans i18nKey="privacy.content.19" components={[<strong/>, <Paragraph/>]}></Trans>
        </li>
        <li>
          <Trans i18nKey="privacy.content.20" components={[<strong/>, <Paragraph/>]}></Trans>
          <table>
            <DataTableHead>
              <tr>
                <ThLeft>{t("privacy.content.21")}</ThLeft>
                <ThRight>{t("privacy.content.22")}</ThRight>
              </tr>
            </DataTableHead>
            <tbody>
              <TrLine>
                <TdLeft>
                  <u>{t("privacy.content.23")}</u>
                </TdLeft>
                <TdRight>
                  {t("privacy.content.24")}
                </TdRight>
              </TrLine>
              <TrLine>
                <TdLeft>
                  <u>{t("privacy.content.25")}</u>
                </TdLeft>
                <TdRight>
                  {t("privacy.content.26")}
                </TdRight>
              </TrLine>
              <TrLine>
                <TdLeft>
                  <u>{t("privacy.content.27")}</u>
                </TdLeft>
                <TdRight>
                  {t("privacy.content.28")}
                </TdRight>
              </TrLine>
              <TrLine>
                <TdLeft>
                  <u>{t("privacy.content.29")}</u>
                </TdLeft>
                <TdRight>
                  {t("privacy.content.30")}
                </TdRight>
              </TrLine>
              <TrLine>
                <TdLeft>
                  <u>{t("privacy.content.31")}</u>
                </TdLeft>
                <TdRight>
                  {t("privacy.content.32")}
                </TdRight>
              </TrLine>
              <TrLine>
                <TdLeft>
                  <u>{t("privacy.content.33")}</u>
                </TdLeft>
                <TdRight>
                  {t("privacy.content.34")}
                </TdRight>
              </TrLine>
              <TrLine>
                <TdLeft>
                  <u>{t("privacy.content.35")}</u>
                </TdLeft>
                <TdRight>
                  {t("privacy.content.36")}
                </TdRight>
              </TrLine>
              <TrLine>
                <TdLeft>
                  <u>{t("privacy.content.37")}</u>
                </TdLeft>
                <TdRight>
                  {t("privacy.content.38")}
                </TdRight>
              </TrLine>
              <tr>
                <TdLeft>
                  <u>{t("privacy.content.39")}</u>
                </TdLeft>
                <TdRight>
                  {t("privacy.content.40")}
                </TdRight>
              </tr>
            </tbody>
          </table>
        </li>
        <li>
          <strong>{t("privacy.content.41")}</strong>
          <Paragraph>
            <Trans i18nKey="privacy.content.42" components={[<strong/>]}></Trans>
          </Paragraph>
          <Paragraph>
            {t("privacy.content.43")}
          </Paragraph>
        </li>
        <li>
          <Trans i18nKey="privacy.content.44" components={[<strong/>, <Paragraph/>]}></Trans>
          <Paragraph>
            {t("privacy.content.45")}
            <ListNoIndent type="a">
              <Trans i18nKey="privacy.content.46" components={[<li/>, <li/>, <li/>]}></Trans>
            </ListNoIndent>
          </Paragraph>
          <Paragraph>
            <Trans i18nKey="privacy.content.47" components={[<TermsLink href="mailto:legal@fightpandemics.com"/>]}></Trans>
            <ListNoIndent type="a">
              <li>
                <Trans i18nKey="privacy.content.48" components={[<u/>]}></Trans>
              </li>
              <li>
                <Trans i18nKey="privacy.content.49" components={[<u/>]}></Trans>
              </li>
              <li>
                <Trans i18nKey="privacy.content.50" components={[<u/>]}></Trans>
              </li>
              <li>
                <Trans i18nKey="privacy.content.51" components={[<u/>]}></Trans>
              </li>
              <li>
                <Trans i18nKey="privacy.content.52" components={[<u/>]}></Trans>
              </li>
            </ListNoIndent>
          </Paragraph>
        </li>
        <li>
          <Trans i18nKey="privacy.content.53" components={[<strong/>, <Paragraph/>]}></Trans>
        </li>
        <li>
          <strong>{t("privacy.content.54")}</strong>
          <Paragraph>
            {t("privacy.content.55")}
            <ListNoIndent type="a">
              <li>
                <Trans i18nKey="privacy.content.56" components={[<u/>]}></Trans>
              </li>
              <li>
                <Trans i18nKey="privacy.content.57" components={[<u/>]}></Trans>
              </li>
              <li>
                <Trans i18nKey="privacy.content.58" components={[<u/>]}></Trans>
              </li>
              <li>
                <Trans i18nKey="privacy.content.59" components={[<u/>]}></Trans>
              </li>
            </ListNoIndent>
          </Paragraph>
        </li>
        <li>
          <strong>{t("privacy.content.60")}</strong>
          <Paragraph>
            {t("privacy.content.61")}
            <ListNoIndent tyoe="a">
              <Trans i18nKey="privacy.content.62" components={[<li/>, <li/>, <li/>, <li/>]}></Trans>
            </ListNoIndent>
          </Paragraph>
          <Paragraph>
            {t("privacy.content.63")}
          </Paragraph>
        </li>
        <li>
          <Trans i18nKey="privacy.content.64" components={[<strong/>, <Paragraph/>]}></Trans>
        </li>
        <li>
          <Trans i18nKey="privacy.content.65" components={[<strong/>, <Paragraph/>]}></Trans>
        </li>
        <li>
          <strong>{t("privacy.content.66")}</strong>
          <Paragraph>
            <Trans i18nKey="privacy.content.67" components={[<TermsLink href="mailto:legal@fightpandemics.com"/>]}></Trans>
          </Paragraph>
        </li>
        <li>
          <Trans i18nKey="privacy.content.68" components={[<strong/>, <Paragraph/>]}></Trans>
        </li>
      </ol>
      <Date>{t("privacy.date")}</Date>
    </>
  );
};

export default PrivacyPolicyContent;
