import { Flex, WhiteSpace } from "antd-mobile";
import React, { useReducer, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import createOrganisationProfile from "assets//data/createOrganisationProfile";
import Marker from "assets/create-profile-images/location-marker.svg";
import Heading from "components/Typography/Heading";
import Input from "components/Input/BaseInput";
import Select from "components/Input/Select";
import SubmitButton from "components/Button/SubmitButton";
import Label from "components/Input/Label";
import StyledCheckbox from "components/Input/Checkbox";
import LocationInput from "components/Input/LocationInput";
import PrivacyPolicyContent from "components/PolicyPages/PrivacyPolicyContent";
import TermsConditionsContent from "components/PolicyPages/TermsConditionsContent";
import PolicyModal from "components/PolicyPages/PolicyModal";
import Checkbox from "components/Input/Checkbox";
import createOrganisationSvg from "assets/icons/create-organisation.svg";
import { connect } from "react-redux";
import { theme } from "constants/theme";
import { StyledForm } from "../components/CreatePost/StyledCreatePost";
import ErrorAlert from "components/Alert/ErrorAlert";
import { validateEmail } from "utils/validators";
import {
  Main,
  SvgContainer,
  FormContainer,
  InputWrapper,
  InputGroup,
  CheckboxContainer,
  styleLabel,
  styleInput,
  globalText,
  errorStyles,
} from "components/OrganisationProfile/CreateProfileComponents";
import {
  CREATE_Organisation,
  CREATE_Organisation_ERROR,
} from "hooks/actions/organisationActions";
import {
  createOrganisationFormReducer,
  initialState,
} from "hooks/reducers/organisationReducers";
import axios from "axios";
import { inlineLabelStyles } from "constants/formStyles";
import styled from "styled-components";
import GTM from "constants/gtm-tags";

const StyledUnderlineLink = styled.a`
  text-decoration-line: underline;
`;

const { type, industry } = createOrganisationProfile;

const CheckboxGroup = ({
  defaultValue,
  description,
  label,
  name,
  onChange,
}) => {
  return (
    <CheckboxContainer>
      <Checkbox
        defaultValue={defaultValue}
        color={theme.colors.royalBlue}
        id={name}
        name={name}
        size={theme.typography.size.xxlarge}
        onChange={onChange}
      />
      <Flex direction="column" align="start">
        <Label
          htmlFor={name}
          style={{...inlineLabelStyles, fontSize: theme.typography.size.medium}}
          label={label}
        />
        {description && <span>{description}</span>}
      </Flex>
    </CheckboxContainer>
  );
};

const CreateOrgProfile = (props) => {
  const {
    clearError,
    register,
    handleSubmit,
    control,
    errors,
    setError,
  } = useForm({
    mode: "change",
  });

  const [
    createOrganisationFormState,
    createOrganisationFormDispatch,
  ] = useReducer(createOrganisationFormReducer, initialState);

  const [location, setLocation] = useState(null);
  const [privacy, setPrivacy] = useState("");
  const [conditions, setConditions] = useState("");
  const [validEmail, setValid] = useState(false);
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const [privacyPolicyModalVisible, setPrivacyPolicyModalVisible] = useState(
    false,
  );
  const [
    termsConditionsModalVisible,
    setTermsConditionsModalVisible,
  ] = useState(false);
  const [needsOtherCheckbox, setNeedsOtherCheckbox] = useState(false);
  const [offersOtherCheckbox, setOffersOtherCheckbox] = useState(false);

  const handleLocationChange = (location) => {
    setLocation(location);
    clearError("location");
  };
  const handleInputChangePrivacy = (e) => {
    setPrivacy(e.target.checked);
  };
  const handleInputChangeConditions = (e) => {
    setConditions(e.target.checked);
  };
  const handleInputChangeEmail = (e) => {
    setEmail(e.target.value);
    setValid(e.target.checkValidity());
  };

  const showPrivacyPolicyModal = (e) => {
    e.preventDefault();
    setPrivacyPolicyModalVisible(true);
  };
  const hidePrivacyPolicyModal = () => {
    setPrivacyPolicyModalVisible(false);
  };

  const showTermsConditionsModal = (e) => {
    e.preventDefault();
    setTermsConditionsModalVisible(true);
  };
  const hideTermsConditionsModal = () => {
    setTermsConditionsModalVisible(false);
  };

  const onFormSubmit = async (formData) => {
    if (!privacy) {
      return createOrganisationFormDispatch({
        type: CREATE_Organisation_ERROR,
        error: t("error.privacyPolicyRequired"),
      });
    } else if (!conditions) {
      return createOrganisationFormDispatch({
        type: CREATE_Organisation_ERROR,
        error: t("error.termsConditionsRequired"),
      });
    } else {
      if (props.user) {
        if (!location) {
          // all location objects should have address (+coordinates), others optional
          return setError(
            "location",
            "required",
            t("profile.common.addressRequired"),
          );
        }
        createOrganisationFormDispatch({ type: CREATE_Organisation });
        try {
          formData.location = location;

          const res = await axios.post("/api/organisations", formData);
          if (res) {
            props.history.push("/create-organisation-complete", {
              orgId: res.data._id,
            });
          }
        } catch (err) {
          const message = err.response?.data?.message || err.message;
          const translatedErrorMessage = t([
            `error.${message}`,
            `error.http.${message}`,
          ]);
          createOrganisationFormDispatch({
            type: CREATE_Organisation_ERROR,
            error: `${t("error.failedCreatingOrgProfile")} ${translatedErrorMessage}`,
          });
        }
      } else {
        return createOrganisationFormDispatch({
          type: CREATE_Organisation_ERROR,
          error: t("error.loggedInToCreateOrgProfile"),
        });
      }
    }
  };

  return (
    <Main>
      <SvgContainer>
        <img src={createOrganisationSvg} alt={t("alt.createOrg")} />
      </SvgContainer>
      <FormContainer>
        <Heading className="h4" level={4}>
          {t("profile.org.title")}
        </Heading>
        {createOrganisationFormState.error && (
          <ErrorAlert
            message={createOrganisationFormState.error}
            type="error"
          />
        )}
        <WhiteSpace />
        <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
          <InputWrapper>
            <Label style={styleLabel} label={"* " + t("profile.org.name")} />
            <Input
              type="text"
              required
              placeholder=""
              onChange={(name) => name}
              style={styleInput}
              ref={register({
                required: t("profile.org.orgNameRequired"),
                maxLength: {
                  value: 60,
                  message: t("profile.common.maxCharacters", { maxNum: 60 }),
                },
              })}
              name="name"
            />
            <span style={errorStyles}>{errors.name?.message}</span>
          </InputWrapper>
          <WhiteSpace />
          <WhiteSpace />
          <InputWrapper>
            <Label style={styleLabel} label={"* " + t("profile.org.email")} />
            <Input
              type="email"
              required
              placeholder=""
              onChange={handleInputChangeEmail}
              style={styleInput}
              name="email"
              ref={register({
                validate: (email) => validateEmail(email),
              })}
            />
            {validEmail}
            <span style={errorStyles}>
              {errors.email && t(`profile.common.${errors.email.message}`)}
            </span>
          </InputWrapper>
          <WhiteSpace />
          <WhiteSpace />
          <InputWrapper>
            <Label
              style={styleLabel}
              htmlFor="location"
              icon={Marker}
              label={t("profile.common.address")}
            />
            <LocationInput
              formError={errors.location}
              location={location}
              onLocationChange={handleLocationChange}
            />
          </InputWrapper>
          <WhiteSpace />
          <InputWrapper>
            <Controller
              as={StyledCheckbox}
              name="global"
              control={control}
              onChange={([event]) => event.target.checked}
            />
            <span style={globalText}>{t("profile.org.globalOrg")}</span>
          </InputWrapper>
          <WhiteSpace />
          <InputWrapper>
            <Label
              style={styleLabel}
              label={"* " + t("profile.org.typeAndIndustry")}
            />
          </InputWrapper>
          <div>
            <Controller
              as={
                <Select
                  style={{ width: "100%" }}
                  defaultValue={t("profile.org.type")}
                >
                  {type.options.map((option, i) => (
                    <Select.Option key={i} value={option.text}>
                      {t("profile.org.types." + i)}
                    </Select.Option>
                  ))}
                </Select>
              }
              control={control}
              name="type"
              rules={{ required: true }}
              onClick={(event) => event.target.innerText}
            />
            <Controller
              as={
                <Select
                  style={{ width: "100%" }}
                  defaultValue={t("profile.org.industry")}
                >
                  {industry.options.map((option, i) => (
                    <Select.Option key={i} value={option.text}>
                      {t("profile.org.industries." + i)}
                    </Select.Option>
                  ))}
                </Select>
              }
              name="industry"
              rules={{ required: true }}
              control={control}
              onClick={(event) => event.target.innerText}
            />
            <span style={errorStyles}>
              {errors.type || errors.industry
                ? t("profile.org.typeIndustryError")
                : ""}
            </span>
            <WhiteSpace />
            <WhiteSpace />
          </div>
          <Flex
            direction="row"
            align="start"
            justify="between"
          >
            <InputWrapper> 
              <InputGroup>
                <Label
                  style={styleLabel}
                  label={
                    <Trans i18nKey="profile.org.seeking">
                      <b>request</b>
                    </Trans>
                  }
                />
                <Controller
                  as={CheckboxGroup}
                  control={control}
                  defaultValue={false}
                  name="needs.donations"
                  label={t("profile.org.donations")}
                  onChange={([event]) => event.target.checked}
                />
                <Controller
                  as={CheckboxGroup}
                  control={control}
                  defaultValue={false}
                  name="needs.volunteers"
                  label={t("profile.org.volunteers")}
                  onChange={([event]) => event.target.checked}
                />
                <Controller
                  as={CheckboxGroup}
                  control={control}
                  defaultValue={false}
                  name="needs.staff"
                  label={t("profile.org.staff")}
                  onChange={([event]) => event.target.checked}
                />
                <Controller
                  as={CheckboxGroup}
                  control={control}
                  defaultValue={false}
                  label={t("profile.org.information")}
                  name="needs.information"
                  onChange={([event]) => event.target.checked}
                />
                <Controller
                  as={CheckboxGroup}
                  control={control}
                  defaultValue={false}
                  label={t("profile.org.resources")}
                  name="needs.resources"
                  onChange={([event]) => event.target.checked}
                />
                <Controller
                  as={CheckboxGroup}
                  control={control}
                  defaultValue={false}
                  name="needs.other"
                  label={t("profile.org.other")}
                  onChange={([event]) => {
                    setNeedsOtherCheckbox(!needsOtherCheckbox);
                    return event.target.checked;
                  }}
                />
                { needsOtherCheckbox &&
                  <InputWrapper>
                    <Label style={styleLabel} label="" />
                    <Input
                      type="text"
                      required
                      placeholder={t("profile.org.otherDetails")}
                      onChange={(othersDetails) => othersDetails}
                      style={{...styleInput, width: '80%'}}
                      ref={register({
                        required: t("profile.org.otherDetails"),
                        maxLength: {
                          value: 60,
                          message: t("profile.common.maxCharacters", {maxNum: 60}),
                        },
                      })}
                      name="needs.othersDetail"
                    />
                    <div style={errorStyles}>{errors.needs && errors.needs.othersDetail && errors.needs.othersDetail.message}</div>
                  </InputWrapper>
                }
              </InputGroup>
              <span style={errorStyles}>
                {errors.needs && t("error.selectOneOption")}
              </span>
            </InputWrapper>
            <InputWrapper>
              <InputGroup>
                <Label
                  style={styleLabel}
                  label={
                    <Trans i18nKey="profile.org.offering">
                      <b>offer</b>
                    </Trans>
                  }
                />
                <Controller
                  as={CheckboxGroup}
                  control={control}
                  defaultValue={false}
                  label="Donations"
                  name="offers.donations"
                  onChange={([event]) => event.target.checked}
                />
                <Controller
                  as={CheckboxGroup}
                  control={control}
                  defaultValue={false}
                  label="Volunteers"
                  name="offers.volunteers"
                  onChange={([event]) => event.target.checked}
                />
                <Controller
                  as={CheckboxGroup}
                  control={control}
                  defaultValue={false}
                  label="Staff"
                  name="offers.staff"
                  onChange={([event]) => event.target.checked}
                />
                <Controller
                  as={CheckboxGroup}
                  control={control}
                  defaultValue={false}
                  label="Information"
                  name="offers.information"
                  onChange={([event]) => event.target.checked}
                />
                <Controller
                  as={CheckboxGroup}
                  control={control}
                  defaultValue={false}
                  label="Resources/Tools"
                  name="offers.resources"
                  onChange={([event]) => event.target.checked}
                />
                <Controller
                  as={CheckboxGroup}
                  control={control}
                  defaultValue={false}
                  label="Others"
                  name="offers.other"
                  onChange={([event]) => {
                    setOffersOtherCheckbox(!offersOtherCheckbox);
                    return event.target.checked;
                  }}
                />
                { offersOtherCheckbox &&
                  <InputWrapper>
                    <Label style={styleLabel} label="" />
                    <Input
                      type="text"
                      required
                      placeholder={t("profile.org.otherDetails")}
                      onChange={(othersDetails) => othersDetails}
                      style={{...styleInput, width: '80%'}}
                      ref={register({
                        required: t("profile.org.otherDetails"),
                        maxLength: {
                          value: 60,
                          message: t("profile.common.maxCharacters", {maxNum: 60}),
                        },
                      })}
                      name="offers.othersDetail"
                    />
                    <div style={errorStyles}>{errors.offers && errors.offers.othersDetail && errors.offers.othersDetail.message}</div>
                  </InputWrapper>
                }
              </InputGroup>
              <span style={errorStyles}>
                {errors.offers && t("error.selectOneOption")}
              </span>
            </InputWrapper>
          </Flex>
          <InputWrapper>
            <Label style={styleLabel} label="" />
            <StyledCheckbox
              style={{ fontSize: "1.2rem" }}
              value="I agree to the Privacy Policy"
              onChange={handleInputChangePrivacy}
            >
              <Trans i18nKey="profile.common.agreePrivacy">
                <StyledUnderlineLink onClick={showPrivacyPolicyModal}>
                  Privacy Policy
                </StyledUnderlineLink>
              </Trans>
            </StyledCheckbox>
            <WhiteSpace />
            <Label style={styleLabel} label="" />
            <StyledCheckbox
              style={{ fontSize: "1.2rem" }}
              value="I agree to the Terms and Conditions"
              onChange={handleInputChangeConditions}
            >
              <Trans i18nKey="profile.common.agreeTerms">
                <StyledUnderlineLink onClick={showTermsConditionsModal}>
                  Terms and Conditions
                </StyledUnderlineLink>
              </Trans>
            </StyledCheckbox>
          </InputWrapper>
          <WhiteSpace />
          <WhiteSpace />
          <SubmitButton
            primary="true"
            onClick={handleSubmit(onFormSubmit)}
            style={{ fontWeight: "normal" }}
            disabled={!(privacy && conditions && validateEmail(email))}
            id={
              GTM.organisation.createOrgProfPrefix + GTM.profile.createProfile
            }
          >
            {createOrganisationFormState.loading
              ? t("profile.common.submitLoading")
              : t("profile.common.submit")}
          </SubmitButton>
        </StyledForm>
        <WhiteSpace />
      </FormContainer>
      <PolicyModal
        title="Privacy Policy"
        visible={privacyPolicyModalVisible}
        handleHideModal={hidePrivacyPolicyModal}
      >
        <PrivacyPolicyContent />
      </PolicyModal>
      <PolicyModal
        title={`Terms & Conditions`}
        visible={termsConditionsModalVisible}
        handleHideModal={hideTermsConditionsModal}
      >
        <TermsConditionsContent />
      </PolicyModal>
    </Main>
  );
};

const mapStateToProps = ({ session }) => {
  return {
    user: session.user,
  };
};

export default connect(mapStateToProps)(CreateOrgProfile);
