import React, { useContext, useState, useEffect } from 'react';
import { notification, Spin } from 'antd'
import {
    EditLayout,
    TitlePictureWrapper,
    FillEmptySpace,
    CustomHeading,
    ToggleHeading,
    ProfilePicWrapper,
    CustomEditAccountHeader,
    Background,
    FormLayout,
    OptionDiv,
    CustomLink,
    CustomForm,
    CustomSubmitButton,
} from "../components/EditProfile/EditComponents";
import ProfilePic from "components/Picture/ProfilePic";
import { useTranslation } from "react-i18next";
import { getInitialsFromFullName } from "utils/userInfo";
import { UserContext, withUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { fetchUser, fetchUserError, fetchUserSuccess } from 'hooks/actions/userActions';
import axios from 'axios';
import ErrorAlert from 'components/Alert/ErrorAlert';
import { useForm } from 'react-hook-form';
import { blockLabelStyles, inputStyles } from 'constants/formStyles';
import Input from "components/Input/BaseInput";
import InputError from "components/Input/InputError";
import Label from "components/Input/Label";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "config";
import styled from 'styled-components';
import { theme } from "constants/theme";
import { validatePassword } from "utils/validators";

// Icons
import SvgIcon from "components/Icon/SvgIcon";
import eyeUnmask from "assets/icons/eye-unmask.svg";
import eyeMask from "assets/icons/eye-mask.svg";


const EditUserPassword = (props) => {
    const { userProfileState, userProfileDispatch } = useContext(UserContext);
    const { t } = useTranslation();
    const { error, loading, user } = userProfileState;
    const { firstName, lastName, usesPassword = false } =
        user || {};

    const {
        errors,
        handleSubmit,
        register,
        getValues
    } = useForm({
        mode: "change",
    });

    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");
    const [oldPasswordType, setOldPasswordType] = useState("password");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        (async function fetchProfile() {
            userProfileDispatch(fetchUser());
            try {
                const res = await axios.get("/api/users/current");
                userProfileDispatch(fetchUserSuccess(res.data));
            } catch (err) {
                const message = err.response?.data?.message || err.message;
                const translatedErrorMessage = t([
                    `error.${message}`,
                    `error.http.${message}`,
                ]);
                userProfileDispatch(
                    fetchUserError(
                        `${t("error.failedLoadingProfile")} ${translatedErrorMessage}`,
                    ),
                );
            }
        })();
    }, [userProfileDispatch]);

    if (loading) return <div>"{t("profile.common.loading")}"</div>;

    const togglePasswordVisibility = () => {
        if (passwordType === "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    };
    const toggleOldPasswordVisibility = () => {
        if (oldPasswordType === "password") {
            setOldPasswordType("text");
        } else {
            setOldPasswordType("password");
        }
    };

    const toggleConfirmPasswordVisibility = () => {
        if (confirmPasswordType === "password") {
            setConfirmPasswordType("text");
        } else {
            setConfirmPasswordType("password");
        }
    };

    const comparePasswordConfirmation = (confirmPassword) => {
        const { newPassword } = getValues();
        return newPassword === confirmPassword || t("auth.passwordNotMatch");
    };

    const onSubmit = async (values) => {
        const { newPassword, oldPassword } = values

        setLoading(true)
        try {
            await axios.put('/api/auth/password', { newPassword, oldPassword })
            notification.success({ message: t('profile.individual.passwordUpdateSuccess') })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            let errorMessage = error?.response?.data?.message || error?.message;
            let description = "";

            if (errorMessage === "wrongCredentials") {
                description = t('error.wrongOldPassword')
            } else { t(`error.${errorMessage}`) }

            notification.error({
                message: t('profile.individual.passwordUpdateError'),
                description,
            })

        }
    }

    const VisibilityButton = ({ onClick, type }) => {
        return (
            <VisibilityIconWrapper>
                {type === "text" ? (
                    <SvgIcon src={eyeMask} onClick={onClick} />
                ) : (
                        <SvgIcon src={eyeUnmask} onClick={onClick} />
                    )}
            </VisibilityIconWrapper>
        );
    };

    return (
        <Background>
            <EditLayout>
                <TitlePictureWrapper>
                    <CustomEditAccountHeader className="h4">
                        {t("profile.individual.editProfile")}
                    </CustomEditAccountHeader>
                    <ToggleHeading>
                        <CustomHeading level={4} className="h4">
                            {t("profile.common.changePassword")}
                        </CustomHeading>
                    </ToggleHeading>
                    <FillEmptySpace />
                    <ProfilePicWrapper>
                        <ProfilePic
                            resolution={"768rem"}
                            allowUpload={false}
                            user={user}
                            initials={getInitialsFromFullName(`${firstName} ${lastName}`)}
                        />
                        {/* hide this until backend API is available
                <ChangePicButton>Change</ChangePicButton> */}
                    </ProfilePicWrapper>
                </TitlePictureWrapper>
                <FormLayout>
                    <OptionDiv>
                        <CustomLink >
                            <Link to="/edit-account">{t("profile.common.accountInfo")}</Link>
                        </CustomLink>
                        <CustomLink>
                            <Link to="/edit-profile">{t("profile.common.profileInfo")}</Link>
                        </CustomLink>
                        {usesPassword && (
                            <CustomLink isSelected>
                                <Link to="/edit-security">{t("profile.common.securityInfo")}</Link>
                            </CustomLink>
                        )}

                    </OptionDiv>
                    <CustomForm>
                        {error && <ErrorAlert message={error} type="error" />}
                        {isLoading && (<div style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                        }}>
                            <Label
                                htmlFor="updatingPassword"
                                style={{ ...blockLabelStyles, fontSize: "2.0rem" }}
                                label={t("profile.individual.updatingPassword")}
                            />

                            <Spin size="large" style={{ marginLeft: "1.0rem" }} />
                        </div>)}
                        {!isLoading && (
                            <>
                                <InputWrapper>
                                    <Label
                                        htmlFor="oldPassword"
                                        style={blockLabelStyles}
                                        label={t("profile.individual.currentPassword")}
                                    />
                                    <Input
                                        type={oldPasswordType}
                                        name="oldPassword"
                                        id="oldPassword"
                                        className={errors.oldPassword && "has-error"}
                                        placeholder={t("profile.individual.enterCurrentPassword")}
                                        ref={register({
                                            required: t("profile.individual.currentPasswordRequired") + ".",
                                        })}
                                        style={{ ...inputStyles, paddingRight: "3.5rem" }}
                                    />
                                    <VisibilityButton
                                        onClick={toggleOldPasswordVisibility}
                                        type={oldPasswordType}
                                    />
                                    {errors.oldPassword && (
                                        <InputError>{errors.oldPassword.message}</InputError>
                                    )}
                                </InputWrapper>

                                <InputWrapper>
                                    <Label
                                        htmlFor="newPassword"
                                        style={blockLabelStyles}
                                        label={t("profile.individual.newPassword")}
                                    />
                                    <Input
                                        type={passwordType}
                                        name="newPassword"
                                        id="newPassword"
                                        className={errors.newPassword && "has-error"}
                                        placeholder={t("profile.individual.enterNewPassword")}
                                        ref={register({
                                            maxLength: {
                                                value: PASSWORD_MAX_LENGTH,
                                                message: t("auth.passwordMax", {
                                                    num: PASSWORD_MAX_LENGTH,
                                                }),
                                            },
                                            minLength: {
                                                value: PASSWORD_MIN_LENGTH,
                                                message: t("auth.passwordMin", {
                                                    num: PASSWORD_MIN_LENGTH,
                                                }),
                                            },
                                            required: t("profile.individual.newPasswordRequired") + ".",
                                            validate: (newPassword) =>
                                                validatePassword(newPassword) ||
                                                t("profile.common.invalidPassword"),
                                        })}
                                        style={{ ...inputStyles, paddingRight: "3.5rem" }}
                                    />
                                    <VisibilityButton
                                        onClick={togglePasswordVisibility}
                                        type={passwordType}
                                    />
                                    {errors.newPassword && (
                                        <InputError>{errors.newPassword.message}</InputError>
                                    )}
                                </InputWrapper>

                                <InputWrapper>
                                    <Label
                                        htmlFor="confirmPassword"
                                        style={blockLabelStyles}
                                        label={t("profile.individual.confirmNewPassword")}
                                    />
                                    <Input
                                        type={confirmPasswordType}
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        className={errors.confirmPassword && "has-error"}
                                        required
                                        placeholder={t("auth.confirmPassword")}
                                        ref={register({
                                            maxLength: PASSWORD_MAX_LENGTH,
                                            minLength: PASSWORD_MIN_LENGTH,
                                            required: t("auth.passwordConfirmationRequired"),
                                            validate: comparePasswordConfirmation,
                                        })}
                                        style={{ ...inputStyles, paddingRight: "3.5rem" }}
                                    />
                                    <VisibilityButton
                                        onClick={toggleConfirmPasswordVisibility}
                                        type={confirmPasswordType}
                                    />
                                    {errors.confirmPassword && (
                                        <InputError>{errors.confirmPassword.message}</InputError>
                                    )}
                                </InputWrapper>
                                <AuthLink to="/auth/forgot-password">
                                    {t("auth.forgotPassword")}
                                </AuthLink>
                                <CustomSubmitButton primary="true" onClick={handleSubmit(onSubmit)}>
                                    {t("profile.common.saveChanges")}
                                </CustomSubmitButton>
                            </>
                        )}

                    </CustomForm>
                </FormLayout>

            </EditLayout>
        </Background>
    )
}
const { colors, typography } = theme;

const InputWrapper = styled.div`
  margin: 2.2rem auto;
  width: 100%;
  position: relative;
`;

const VisibilityIconWrapper = styled.div`
  position: absolute;
  top: 2.3rem;
  right: 0.5rem;
  color: ${colors.tropicalBlue};
  cursor: pointer;
`;
const AuthLink = styled(Link)`
  font-family: ${typography.font.family.display};
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 2.1rem;
  color: ${colors.royalBlue};
  align-self: center;
`;


export default withUserContext(EditUserPassword)
