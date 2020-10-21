import React, { useContext, useState, useEffect } from 'react';
import { Input, Button, notification } from 'antd'
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
    CustomContainer,
    StyledForm
} from "../components/EditProfile/EditComponents";
import ProfilePic from "components/Picture/ProfilePic";
import { useTranslation } from "react-i18next";
import { getInitialsFromFullName } from "utils/userInfo";
import { UserContext, withUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { fetchUser, fetchUserError, fetchUserSuccess } from 'hooks/actions/userActions';
import axios from 'axios';
import ErrorAlert from 'components/Alert/ErrorAlert';

const EditUserPassword = (props) => {
    const { userProfileState, userProfileDispatch } = useContext(UserContext);
    const { t } = useTranslation();
    const { error, loading, user } = userProfileState;
    const { firstName, lastName } =
        user || {};
    const strongRegex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})`);


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

    const handleChangePassword = async (values) => {
        const { newPassword, oldPassword } = values

        setLoading(true)
        try {
            await axios.put('/api/auth/password', { newPassword, oldPassword })
            notification.success({ message: t('profile.individual.passwordUpdateSuccess') })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            notification.error({ message: t('profile.individual.passwordUpdateError') })

        }
    }



    return (
        <Background>
            <EditLayout>
                <TitlePictureWrapper>
                    <CustomEditAccountHeader className="h4">
                        {t("profile.individual.editProfile")}
                    </CustomEditAccountHeader>
                    <ToggleHeading>
                        <CustomHeading level={4} className="h4">
                            {t("profile.common.accountInfo")}
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
                        <CustomLink isSelected>
                            <Link to="/edit-security">{t("profile.common.securityInfo")}</Link>
                        </CustomLink>
                    </OptionDiv>
                    <CustomContainer>
                        {error && <ErrorAlert message={error} type="error" />}
                        <StyledForm
                            name="change-password"
                            onFinish={handleChangePassword}
                            layout="vertical"
                        >

                            <StyledForm.Item
                                name="oldPassword"
                                label={t('profile.individual.currentPassword')}
                                rules={[{ required: true, message: t('profile.individual.currentPasswordRequired') },]}
                                hasFeedback
                            >
                                <Input.Password />
                            </StyledForm.Item>

                            <StyledForm.Item
                                name="newPassword"
                                label={t('profile.individual.newPassword')}
                                rules={[
                                    { required: true, message: t('profile.individual.newPasswordRequired'), },
                                    () => ({
                                        validator(rule, value) {
                                            if (value && !strongRegex.test(value)) {

                                                return Promise.reject(t('profile.common.invalidPassword'));
                                            } else if (value && strongRegex.test(value)) {
                                                return Promise.resolve();
                                            } else {
                                                return Promise.reject()
                                            }
                                        },
                                    }),
                                ]}
                                hasFeedback
                            >
                                <Input.Password style={{ width: "100%" }} />
                            </StyledForm.Item>

                            <StyledForm.Item
                                name="confirm"
                                label={t('profile.individual.confirmNewPassword')}
                                dependencies={['newPassword']}
                                hasFeedback
                                rules={[
                                    { required: true, message: t('profile.individual.confirmNewPasswordRequired') },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(t('profile.individual.passwordMatch'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </StyledForm.Item>

                            <div style={{ textAlign: "center" }}>
                                <Button loading={isLoading} htmlType="submit" type="primary" shape="round" size="large">{t('profile.common.saveChanges')}</Button>

                            </div>


                        </StyledForm>
                    </CustomContainer>
                </FormLayout>

            </EditLayout>
        </Background>
    )
}

export default withUserContext(EditUserPassword)
