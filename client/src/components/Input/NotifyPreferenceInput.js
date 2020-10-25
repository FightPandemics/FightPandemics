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

const NotifyType = {
  message: "message.message",
  like: "post.like",
  comment: "comment.comment",
  share: "post.share",
};

const NotifyFreq = {
  instant: "Instant",
  daily: "Daily",
  weekly: "Weekly",
  biweekly: "Biweekly",
};

const NotifyPreferenceInput = ({
  control,
  currPrefs,
  setCurrPrefs,
  checksEnabled,
  setChecksEnabled,
  switchOnOff,
  setSwitchOnOff,
  disabledPrefs,
}) => {
  //const [switchOnOff, setSwitchOnOff] = useState(true);
  //const [checksEnabled, setchecksEnabled] = useState(true);
  //const [currPrefs, setCurrPrefs] = useState(disabledPrefs);
  const { t } = useTranslation();

  useEffect(() => {
    setCurrPrefs({ ...currPrefs, ...disabledPrefs });
    setChecksEnabled(switchOnOff);
  }, [switchOnOff]);

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
          checkedChildren="On"
          unCheckedChildren="Off"
          onChange={(checked) => setSwitchOnOff(checked)}
          control={control}
          checked={switchOnOff}
        />
      </HelpWrapper>
      <br />
      <NotifyCheckboxWrapper>
        {Object.entries(NotifyType).map(([key1, label1]) => (
          <HelpWrapper key={key1}>
            <SubLabel key={key1}>{t(label1)}</SubLabel>
            {Object.entries(NotifyFreq).map(([subkey, sublabel]) => (
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
