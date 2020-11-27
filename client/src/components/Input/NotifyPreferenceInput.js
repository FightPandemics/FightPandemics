import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import Checkbox from "./Checkbox";
import { theme, mq } from "constants/theme";
import { CheckBoxWrapper, Label } from "../EditProfile/EditComponents";
import { WhiteSpace } from "antd-mobile";
import mail from "assets/icons/mail.svg";
import InputLabel from "./Label";
import { blockLabelStyles } from "../../constants/formStyles";

const { medium } = theme.typography.size;

const HelpWrapper = styled.div`
  width: 100%;
  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    display: flex;
    justify-content: flex-start;
  }
`;

const NotifyCheckboxWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
`;

const SubLabel = styled.small`
  display: block;
  margin-top: 10px;
  font-size: ${medium};
  color: ${theme.colors.royalBlue};
  width: 10rem;
`;

const BareHr = styled.hr`
  boarder-width: 0px;
`;

const NotifyGroup = {
  instant: "Instant",
  digest: "Digest",
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
      <InputLabel
        htmlFor="notification"
        icon={mail}
        style={blockLabelStyles}
        label={t("profile.common.emailNotification")}
      />
      <WhiteSpace />
      <HelpWrapper>
        <Switch
          checkedChildren={t("profile.common.on")}
          unCheckedChildren={t("profile.common.off")}
          onChange={(checked) => setSwitchOnOff(checked)}
          control={control}
          checked={switchOnOff}
        />
      </HelpWrapper>
      <br />
      <NotifyCheckboxWrapper>
        {Object.entries(NotifyGroup).map(([key1, label1]) => (
          <HelpWrapper key={key1}>
            <SubLabel key={key1}>{t(`profile.common.${label1.toLowerCase()}`)}</SubLabel>
            {key1 == "instant" &&
              Object.entries(NotifyType).map(([subkey, sublabel]) => (
                <div key={(key1, subkey)}>
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
                      <Label
                        key={(key1, subkey)}
                        inputColor={
                          !checksEnabled
                            ? theme.colors.lightGray
                            : theme.colors.black
                        }
                      >
                        {t(sublabel)}
                      </Label>
                    </Controller>
                  </CheckBoxWrapper>
                  <BareHr />
                </div>
              ))}

            {key1 == "digest" &&
              Object.entries(NotifyFreq).map(([subkey, sublabel]) => (
                <div key={(key1, subkey)}>
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
                      <Label
                        key={(key1, subkey)}
                        inputColor={
                          !checksEnabled
                            ? theme.colors.lightGray
                            : theme.colors.black
                        }
                      >
                        {t("profile.common." + subkey)}
                      </Label>
                    </Controller>
                  </CheckBoxWrapper>
                  <BareHr />
                </div>
              ))}
          </HelpWrapper>
        ))}
      </NotifyCheckboxWrapper>
    </div>
  );
};

export default NotifyPreferenceInput;
