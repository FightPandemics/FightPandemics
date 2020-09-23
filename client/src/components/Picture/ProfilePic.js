import React, {useContext, useState} from "react";
import styled from "styled-components";
import UploadPic from "./UploadPic";
import {mq, theme} from "constants/theme";
import {Modal} from "antd";
import ReactCrop from "react-image-crop";
import BaseButton from "../Button/BaseButton";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";

const {colors} = theme;

const ContainerDiv = styled.div`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    height: 15rem;
  }
`;

const InitialDiv = styled.div`
  margin: auto;
  margin-bottom: 1rem;
  border-radius: 50%;
  border: 0.1rem solid ${colors.royalBlue};
  color: ${colors.royalBlue};
  font-size: 3rem;
  line-height: 6rem;
  width: 7rem;
  text-align: center;
  font-weight: 500;
  background-color: ${colors.offWhite};
  margin-top: 2rem;
  @media screen and (min-width: ${(props) =>
    props.resolution ? props.resolution : mq.tablet.narrow.minWidth}) {
    margin: 0;
    height: 80%;
    line-height: 11rem;
    width: 12rem;
    margin-right: 3rem;
    font-size: 5rem;
  }
`;

const UploadPicDiv = styled.div`
  text-align: center;
  @media screen and (min-width: ${(props) =>
    props.resolution ? props.resolution : mq.tablet.narrow.minWidth}) {
    margin-right: 3rem;
  }
`;

const CustomSubmitButton = styled(BaseButton)`
  background: ${colors.royalBlue};
  color: ${colors.white};
`;

const CustomCancelButton = styled(BaseButton)``;

const ProfilePic = ({allowUpload, initials, resolution, user }) => {
    const [image, setImage] = useState();
    const [photoURL, setPhotoURL] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [croppedImageUrl, setCroppedImageUrl] = useState();
    const [uploadError, setUploadError] = useState("");
    const [croppedImage, setCroppedImage] = useState(null);
    const [crop, setCrop] = useState({
        aspect: 1 / 1,
        unit: "px",
        height: 250,
        width: 250,
    });

    const imageLoaded = (image) => {
        setImage(image);
    };

    const setCroppedImgUrl = (image, crop) => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
        const reader = new FileReader();
        canvas.toBlob((blob) => {
            let uploadResponse;
            let endPoint = `/api/users/${user.id}/avatar`;
            let formData = new FormData();
            formData.append("file", blob);
            if(user.ownerId) {
                endPoint = `/api/organisations/${user._id}/avatar`;
            }
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
                setCroppedImage(blob);
                setCroppedImageUrl(reader.result);
                try {
                    uploadResponse = await axios({
                        method: 'post',
                        url: endPoint,
                        data: formData,
                        headers: {
                            'accept': 'application/json',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': `multipart/form-data`,
                        }
                    });
                    if (uploadResponse.status == 200) {
                        console.log("Success");
                    }
                } catch (error) {
                    setUploadError("Sorry, some network error occurred.");
                    console.log({
                        error,
                    });
                }
            };
        });
    };

    const savePhoto = async () => {
        //Set image locally first
        setCroppedImgUrl(image, crop);
        setModalVisible(false);
    };

    const closeModal = () => {
        setUploadError("");
        setModalVisible(false);
    };

    const cropModal = () => {
        return (
            <Modal
                visible={modalVisible}
                height={"50rem"}
                width={"50rem"}
                okText={"Save"}
                onOk={savePhoto}
                destroyOnClose={true}
                closable={false}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <CustomCancelButton key="cancel" onClick={closeModal}>
                        Cancel
                    </CustomCancelButton>,
                    !uploadError ? (
                        <CustomSubmitButton key="save" onClick={savePhoto}>
                            Submit
                        </CustomSubmitButton>
                    ) : (
                        <>
                        </>
                    ),
                ]}
            >
                <div
                    style={{
                        textAlign: "center",
                    }}
                >
                    {
                        uploadError ?
                            (
                                <h3>{uploadError}</h3>
                            ) :
                            (
                                <ReactCrop
                                    src={photoURL}
                                    crop={crop}
                                    circularCrop={true}
                                    ruleOfThirds
                                    locked={true}
                                    onImageLoaded={imageLoaded}
                                    onChange={(newCrop) => setCrop(newCrop)}
                                />
                            )
                    }
                </div>
            </Modal>
        );
    };

    return (


        <ContainerDiv>
            <InitialDiv resolution={resolution}>
                {user && user.photo ? (

                        <img
                            style={{
                                maxWidth: "100%",
                                borderRadius: "50%",
                                paddingLeft: "1px",
                            }}
                            src={user.photo}
                        />

                ) : (
                    initials
                )}
            </InitialDiv>
            {modalVisible ? cropModal() : <></>}
            {allowUpload ? (
                <UploadPicDiv>
                    <UploadPic
                        cameraIconSize={"22px"}
                        color={"#425af2"}
                        setPhotoURL={setPhotoURL}
                        setModalVisible={setModalVisible}
                        setUploadError={setUploadError}
                    />
                </UploadPicDiv>
            ) : (
                <></>
            )}
        </ContainerDiv>
    );
};

export default ProfilePic;
