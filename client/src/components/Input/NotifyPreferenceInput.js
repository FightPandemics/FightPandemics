import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Switch, Col } from "antd";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import Checkbox from "./Checkbox";
import { theme, mq } from "constants/theme";
import { CheckBoxWrapper, Label } from "../EditProfile/EditComponents";
import { WhiteSpace } from "antd-mobile";
import mail from "assets/icons/mail.svg";
import InputLabel from "./Label";
import { blockLabelStyles } from "../../constants/formStyles";

const FPSwitch = styled(Switch)`
  background-color: ${(props) =>
    props?.checked ? theme.colors.royalBlue : theme.colors.lightGray};
  margin-bottom: 1rem;
`;

const HelpWrapper = styled.div`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    justify-content: flex-start;
  }
`;

const NotifyGroup = {
  instant: "profile.common.instant",
  digest: "profile.common.digest",
};

const NotifyType = {
  like: "post.like_plural",
  share: "post.share_plural",
  comment: "comment.comment_plural",
  message: "message.message_plural",
};

const NotifyFreq = {
  daily: "profile.common.daily",
  weekly: "profile.common.weekly",
  biweekly: "profile.common.biweekly",
};

const NotifyPreferenceInput = ({
  control,
  currPrefs,
  switchOnOff,
  setSwitchOnOff,
}) => {
  const [checksEnabled, setChecksEnabled] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setChecksEnabled(switchOnOff);
  }, [switchOnOff]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <HelpWrapper>
        <Col md="auto">
          <InputLabel
            htmlFor="notification"
            icon={mail}
            style={blockLabelStyles}
            label={t("profile.common.emailNotification")}
          />
        </Col>
        <Col offset={1}></Col>
        <Col>
          <FPSwitch
            checkedChildren={t("profile.common.on")}
            unCheckedChildren={t("profile.common.off")}
            onChange={(checked) => setSwitchOnOff(checked)}
            control={control}
            checked={switchOnOff}
          />
        </Col>
      </HelpWrapper>
      <WhiteSpace />
      <HelpWrapper>
        {Object.entries(NotifyGroup).map(([key1, label1]) => (
          <>
            <Col md="auto" key={(key1, label1)}>
              <WhiteSpace />
              <Label key={(key1, label1)}>{t(label1)}</Label>
              {Object.entries(key1 !== "digest" ? NotifyType : NotifyFreq).map(
                ([subkey, sublabel]) => (
                  <CheckBoxWrapper key={(key1, subkey)}>
                    <Controller
                      key={(key1, subkey)}
                      as={Checkbox}
                      defaultValue={currPrefs[key1][subkey]}
                      name={`notifyPrefs.${key1}.${subkey}`}
                      control={control}
                      onChange={([event]) => event.target.checked}
                      checked={currPrefs[key1][subkey]}
                      disabled={!checksEnabled}
                    >
                      {t(sublabel)}
                    </Controller>
                  </CheckBoxWrapper>
                ),
              )}
              <WhiteSpace />
            </Col>
            <Col span={2}></Col>
          </>
        ))}
      </HelpWrapper>
    </div>
  );
};

export default NotifyPreferenceInput;
