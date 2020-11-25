import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Switch, Space, Col } from "antd";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import Checkbox from "./Checkbox";
import { theme } from "constants/theme";
import {
  CheckBoxWrapper,
  HelpWrapper,
  Label,
} from "../EditProfile/EditComponents";
import { WhiteSpace } from "antd-mobile";
import mail from "assets/icons/mail.svg";
import InputLabel from "./Label";
import { blockLabelStyles } from "../../constants/formStyles";

const FPSwitch = styled(Switch)`
  background-color: ${theme.colors.royalBlue};
  margin-bottom: 1rem;
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
  daily: "Daily",
  weekly: "Weekly",
  biweekly: "Biweekly",
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
      <Space size={"large"}>
        <InputLabel
          htmlFor="notification"
          icon={mail}
          style={blockLabelStyles}
          label={t("profile.common.emailNotification")}
        />
        <FPSwitch
          checkedChildren="On"
          unCheckedChildren="Off"
          onChange={(checked) => setSwitchOnOff(checked)}
          control={control}
          checked={switchOnOff}
        />
      </Space>
      <WhiteSpace />
      <WhiteSpace />
      {Object.entries(NotifyGroup).map(([key1, label1]) => (
        <div key={(key1, label1)}>
          <WhiteSpace />
          <Label key={(key1, label1)}>{t(label1)}</Label>
          <HelpWrapper key={(key1, "wrap")}>
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
            {key1 === "digest" && <Col span={3}></Col>}
          </HelpWrapper>
          <WhiteSpace />
        </div>
      ))}
    </div>
  );
};

export default NotifyPreferenceInput;
