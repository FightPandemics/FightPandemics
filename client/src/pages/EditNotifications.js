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
  const { firstName, lastName } = user || {};
  const { t } = useTranslation();
  const disabledPrefs = {
    message: { instant: false, daily: false, weekly: false, biweekly: false },
    like: { instant: false, daily: false, weekly: false, biweekly: false },
    comment: { instant: false, daily: false, weekly: false, biweekly: false },
    share: { instant: false, daily: false, weekly: false, biweekly: false },
  };
  const [currPrefs, setCurrPrefs] = useState({ ...disabledPrefs });
  const [switchOnOff, setSwitchOnOff] = useState(true);

  const onSubmit = async (formData) => {
    userProfileDispatch(updateUser());
    try {
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
        setCurrPrefs({ ...currPrefs, ...prefs });
        setValue("notifyPrefs", { ...prefs }); // update chexkboxes
        if (isEqual(prefs, disabledPrefs)) {
          setSwitchOnOff(false); // update switch button
        }
        userProfileDispatch(fetchUserSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        userProfileDispatch(
          fetchUserError(`Failed loading profile, reason: ${message}`),
        );
      }
    })();
  }, [userProfileDispatch]);

  if (loading) return <div>"{t("profile.common.loading")}"</div>;
  return (
    <Background>
      <EditLayout>
        <TitlePictureWrapper>
          <CustomHeading level={4} className="h4">
            {t("profile.individual.editProfile")}
          </CustomHeading>
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
            <CustomLink>
              <Link to="/edit-account">{t("profile.common.accountInfo")}</Link>
            </CustomLink>
            <CustomLink>
              <Link to="/edit-profile">{t("profile.common.profileInfo")}</Link>
            </CustomLink>
            <CustomLink isSelected>
              <Link to="/edit-notifications">
                {t("profile.common.notificationInfo")}
              </Link>
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            {error && <ErrorAlert message={error} type="error" />}
            <NotifyPreferenceInput
              control={control}
              currPrefs={currPrefs}
              setCurrPrefs={setCurrPrefs}
              setValue={setValue}
              switchOnOff={switchOnOff}
              setSwitchOnOff={setSwitchOnOff}
              disabledPrefs={disabledPrefs}
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
