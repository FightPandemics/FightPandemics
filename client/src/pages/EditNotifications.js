import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProfilePic from "components/Picture/ProfilePic";
import {
  FillEmptySpace,
  EditLayout,
  TitlePictureWrapper,
  CustomLink,
  CustomHeading,
  OptionDiv,
  FormLayout,
  Background,
  ToggleHeading,
  CustomEditAccountHeader,
  CustomForm,
  CustomSubmitButton,
} from "components/EditProfile/EditComponents";
import ErrorAlert from "components/Alert/ErrorAlert";
import { UserContext, withUserContext } from "context/UserContext";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
  updateUser,
  updateUserError,
  updateUserSuccess,
} from "hooks/actions/userActions";
import { getInitialsFromFullName } from "utils/userInfo";
import NotifyPreferenceInput from "components/Input/NotifyPreferenceInput";
import isEqual from "lodash/isEqual";

function EditNotifications(props) {
  const { userProfileState, userProfileDispatch } = useContext(UserContext);
  const { control, formState, handleSubmit, setValue } = useForm({
    mode: "change",
  });
  const { error, loading, user } = userProfileState;
  const { firstName, lastName, usesPassword = false } = user || {};
  const { t } = useTranslation();
  const disabledPrefs = {
    instant: { message: false, like: false, comment: false, share: false,newapplicant: false},
    digest: { daily: false, weekly: false, biweekly: false },
  };
  const [currPrefs, setCurrPrefs] = useState({ ...disabledPrefs });
  const [switchOnOff, setSwitchOnOff] = useState(true);
  const [isCurrOwner, setCurrOwner] = useState(false);

  const onSubmit = async (formData) => {
    userProfileDispatch(updateUser());
    try {
      if (!switchOnOff) {
        localStorage.setItem(
          "notifyPrefs",
          JSON.stringify(formData.notifyPrefs),
        );
        Object.assign(formData.notifyPrefs, disabledPrefs);
      }
      const res = await axios.patch("/api/users/current", formData);
      userProfileDispatch(updateUserSuccess(res.data));
      props.history.push(`/profile/${res.data._id}`);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      userProfileDispatch(
        updateUserError(`Failed updating profile, reason: ${message}`),
      );
    }
  };

  useEffect(() => {
    (async function fetchProfile() {
      userProfileDispatch(fetchUser());
      try {
        const res = await axios.get("/api/users/current");
        let { _id, ...prefs } = res.data.notifyPrefs;
        //console.log("the res data is " + JSON.stringify(res) );
        let isOwner = false;
        if (res) {
          if (res.data) {
            if (res.data.organisations) {
              if(res.data.organisations.length){
                isOwner = true;
              }
            }
          }
        }  

        if (isEqual(prefs, disabledPrefs)) {
          setSwitchOnOff(false); // update switch button
          const preNotifyPrefsString = localStorage.getItem("notifyPrefs");
          if (preNotifyPrefsString) {
            Object.assign(prefs, JSON.parse(preNotifyPrefsString));
          }
        }
        setCurrOwner(isOwner);
        setCurrPrefs({ ...currPrefs, ...prefs });
        setValue("notifyPrefs", { ...prefs }); // update chexkboxes
        userProfileDispatch(fetchUserSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        userProfileDispatch(
          fetchUserError(`Failed loading profile, reason: ${message}`),
        );
      }
    })();
  }, [userProfileDispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div>"{t("profile.common.loading")}"</div>;
  return (
    <Background>
      <EditLayout>
        <TitlePictureWrapper>
          <CustomEditAccountHeader className="h4">
            {t("profile.individual.editNotification")}
          </CustomEditAccountHeader>
          <ToggleHeading>
            <CustomHeading level={4} className="h4">
              {t("profile.common.notificationInfo")}
            </CustomHeading>
          </ToggleHeading>
          <FillEmptySpace />
          <ProfilePic
            resolution={"768rem"}
            allowUpload={false}
            user={user}
            initials={getInitialsFromFullName(`${firstName} ${lastName}`)}
          />
        </TitlePictureWrapper>
        {/* hide this until backend API is available
        <ChangePicButton>Change</ChangePicButton> */}
        <FormLayout>
          <OptionDiv>
            <CustomLink to="/edit-account">
              {t("profile.common.accountInfo")}
            </CustomLink>
            <CustomLink to="/edit-profile">
              {t("profile.common.profileInfo")}
            </CustomLink>
            {usesPassword && (
              <CustomLink to="/edit-security">
                {t("profile.common.securityInfo")}
              </CustomLink>
            )}
            <CustomLink to="/edit-notifications" isSelected>
              {t("profile.common.notificationInfo")}
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            {error && <ErrorAlert message={error} type="error" />}
            <NotifyPreferenceInput
              control={control}
              currPrefs={currPrefs}
              switchOnOff={switchOnOff}
              setSwitchOnOff={setSwitchOnOff}
              isOwner={isCurrOwner}
            />
            {/* Button that saves changes */}
            <CustomSubmitButton
              disabled={!formState.isValid}
              primary="true"
              onClick={handleSubmit(onSubmit)}
            >
              {t("profile.common.saveChanges")}
            </CustomSubmitButton>
          </CustomForm>
        </FormLayout>
      </EditLayout>
    </Background>
  );
}

export default withUserContext(EditNotifications);
