import React, {useRef, useState} from "react";
import {Modal} from "antd";
import {CameraFilled} from "@ant-design/icons";
import axios from 'axios';
import BaseButton from "../Button/BaseButton";
import ReactCrop from "react-image-crop";
import styled from "styled-components";
import {theme} from "../../constants/theme";

const {colors} = theme;

const CustomSubmitButton = styled(BaseButton)`
  background: ${colors.royalBlue};
  color: ${colors.white};
`;

const CustomCancelButton = styled(BaseButton)``;

const UploadPic = ({
                       cameraIconSize,
                       color,
                       user
                   }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [photoURL, setPhotoURL] = useState();
    const [uploadError, setUploadError] = useState();
    const [image, setImage] = useState();
    const [crop, setCrop] = useState({
        aspect: 1 / 1,
        unit: "px",
        height: 250,
        width: 250,
    });
    const imgUpload = useRef(null);

    const imageLoaded = (image) => {
        setImage(image);
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5001520) {
            setUploadError("Please upload an image of size less than 5 MB.");
        } else {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setPhotoURL(fileReader.result);
            };
            if (file) {
                fileReader.readAsDataURL(file);
            }
        }
        setModalVisible(true);
    };

    const savePhoto = async () => {
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
                        <></>
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
                                    minHeight={250}
                                    minWidth={250}
                                    circularCrop={true}
                                    ruleOfThirds
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
        <div>
            <input
                ref={imgUpload}
                onChange={handleImage}
                type="file"
                accept="image/*"
                style={{display: "none"}}
            />
            <button
                onClick={() => imgUpload.current.click()}
                style={{
                    border: 0,
                    borderColor: "hidden",
                    padding: "0.5rem",
                    borderRadius: "50%",
                    backgroundColor: "inherit",
                }}
            >
                <CameraFilled style={{fontSize: 22 || cameraIconSize, color: colors.royalBlue || color}}/>
            </button>
            {cropModal()}
        </div>
    );
};

export default UploadPic;
