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
  ProfilePicWrapper,
  MobilePicWrapper,
  CustomForm,
  CustomSubmitButton,
} from "components/EditProfile/EditComponents";
import ErrorAlert from "components/Alert/ErrorAlert";
import {
  OrganisationContext,
  withOrganisationContext,
} from "context/OrganisationContext";
import {
  fetchOrganisation,
  fetchOrganisationError,
  fetchOrganisationSuccess,
  updateOrganisation,
  updateOrganisationError,
  updateOrganisationSuccess,
} from "hooks/actions/organisationActions";
import { getInitialsFromFullName } from "utils/userInfo";
import NotifyPreferenceInput from "components/Input/NotifyPreferenceInput";
import isEqual from "lodash/isEqual";

function EditOrganisationNotifications(props) {
  const organisationId = window.location.pathname.split("/")[2];
  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganisationContext,
  );
  const { control, formState, handleSubmit, setValue } = useForm({
    mode: "change",
  });
  const { error, loading, organisation } = orgProfileState;
  const { name } = organisation || {};
  const { t } = useTranslation();
  const disabledPrefs = {
    instant: { message: false, like: false, comment: false, share: false, newapplicant: false},
    digest: { daily: false, weekly: false, biweekly: false },
  };
  const [currPrefs, setCurrPrefs] = useState({ ...disabledPrefs });
  const [switchOnOff, setSwitchOnOff] = useState(true);
  const [isCurrOwner, setCurrOwner] = useState(false);

  const onSubmit = async (formData) => {
    orgProfileDispatch(updateOrganisation());
    try {
      if (!switchOnOff) {
        localStorage.setItem(
          `notifyPrefs-${organisationId}`,
          JSON.stringify(formData.notifyPrefs),
        );
        Object.assign(formData.notifyPrefs, disabledPrefs);
      }
      const res = await axios.patch(
        `/api/organisations/${organisationId}`,
        formData,
      );
      orgProfileDispatch(updateOrganisationSuccess(res.data));
      props.history.push(`/organisation/${res.data._id}`);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);
      orgProfileDispatch(
        updateOrganisationError(
          `${t("error.failedUpdatingOrgProfile")} ${translatedErrorMessage}`,
        ),
      );
    }
  };

  useEffect(() => {
    (async function fetchProfile() {
      orgProfileDispatch(fetchOrganisation());
      try {
        const res = await axios.get(`/api/organisations/${organisationId}`);
        let { _id, ...prefs } = res.data.notifyPrefs;
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
          const preNotifyPrefsString = localStorage.getItem(
            `notifyPrefs-${organisationId}`,
          );
          if (preNotifyPrefsString) {
            Object.assign(prefs, JSON.parse(preNotifyPrefsString));
          }
        }
        setCurrOwner(isOwner);
        setCurrPrefs({ ...currPrefs, ...prefs });
        setValue("notifyPrefs", { ...prefs }); // update chexkboxes
        orgProfileDispatch(fetchOrganisationSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        const translatedErrorMessage = t([
          `error.${message}`,
          `error.http.${message}`,
        ]);
        orgProfileDispatch(
          fetchOrganisationError(
            `${t("error.failedLoadingProfile")} ${translatedErrorMessage}`,
          ),
        );
      }
    })();
  }, [orgProfileDispatch, organisationId]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderProfilePicture = () => {
    if (organisation) {
      return (
        <ProfilePicWrapper>
          <ProfilePic
            resolution={"768rem"}
            user={organisation}
            initials={getInitialsFromFullName(name)}
          />
          {/* hide this until backend API is available
          <ChangePicButton>Change</ChangePicButton> */}
        </ProfilePicWrapper>
      );
    }
  };

  if (loading) return <div>"{t("profile.common.loading")}"</div>;
  return (
    <Background>
      <EditLayout>
        <TitlePictureWrapper>
          <CustomHeading level={4} className="h4">
            {t("profile.org.editOrgNotification")}
          </CustomHeading>
          <FillEmptySpace />
          <ProfilePicWrapper>{renderProfilePicture()}</ProfilePicWrapper>
          <MobilePicWrapper>{renderProfilePicture()}</MobilePicWrapper>
        </TitlePictureWrapper>
        <FormLayout>
          <OptionDiv>
            <CustomLink to={`/edit-organisation-account/${organisationId}`}>
              {t("profile.common.accountInfo")}
            </CustomLink>
            <CustomLink to={`/edit-organisation-profile/${organisationId}`}>
              {t("profile.common.profileInfo")}
            </CustomLink>
            <CustomLink
              to={`/edit-organisation-notifications/${organisationId}`}
              isSelected
            >
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

export default withOrganisationContext(EditOrganisationNotifications);
