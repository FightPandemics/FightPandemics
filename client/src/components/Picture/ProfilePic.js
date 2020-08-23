import React, { createContext, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { mq } from "constants/theme";
import { CameraFilled } from "@ant-design/icons";
import { Modal } from "antd";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ContainerDiv = styled.div`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    position: relative;
    height: 15rem;
  }
`;
const InitialDiv = styled.div`
  margin: auto;
  margin-bottom: 1rem;
  border-radius: 50%;
  border: 0.2rem solid #425af2;
  color: #425af2;
  font-size: 3rem;
  line-height: 6rem;
  width: 7rem;
  text-align: center;
  font-weight: 500;
  background-color: #f3f4fe;
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
  position: absolute;
  z-index: 1;
  text-align: center;
  right: 4rem;
  bottom: 2.12rem;
`;

const ProfilePic = ({ newUpload, initials, resolution }) => {
  const [image, setImage] = useState();
  const [photoURL, setPhotoURL] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState();
  const [crop, setCrop] = useState({
    aspect: 4 / 4,
    unit: "px",
    height: 200,
    width: 200,
  });

  const imageLoaded = (image) => {
    setImage(image);
  };

  const getCroppedImg = (image, crop) => {
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
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        setCroppedImageUrl(reader.result);
      };
    });
  };

  const savePhoto = () => {
    getCroppedImg(image, crop);
    setModalVisible(false);
  };

  return (
    <ContainerDiv>
      <InitialDiv resolution={resolution}>
        {croppedImageUrl ? (
          <img
            style={{
              maxWidth: "100%",
              borderRadius: "50%",
            }}
            src={croppedImageUrl}
          />
        ) : (
          initials
        )}
      </InitialDiv>
      {modalVisible ? (
        <Modal
          visible={modalVisible}
          height={"50rem"}
          width={"50rem"}
          okText={"Save"}
          onOk={savePhoto}
          destroyOnClose={true}
          closable={false}
          onCancel={() => setModalVisible(false)}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <ReactCrop
              src={photoURL}
              crop={crop}
              onImageLoaded={imageLoaded}
              onChange={(newCrop) => setCrop(newCrop)}
            />
          </div>
        </Modal>
      ) : (
        <></>
      )}
      {newUpload ? (
        <UploadPicDiv>
          <UploadPic
            fontSize={"22px"}
            color={"#425af2"}
            setPhotoURL={setPhotoURL}
            setModalVisible={setModalVisible}
          />
        </UploadPicDiv>
      ) : (
        <></>
      )}
    </ContainerDiv>
  );
};

const UploadPic = ({ fontSize, color, setPhotoURL, setModalVisible }) => {
  const imgUpload = useRef(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setPhotoURL(fileReader.result);
      setModalVisible(true);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <input
        ref={imgUpload}
        onChange={handleImage}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
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
        <CameraFilled style={{ fontSize: fontSize, color: color }} />
      </button>
    </div>
  );
};

export default ProfilePic;
