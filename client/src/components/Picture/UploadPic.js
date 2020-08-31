import React, { useRef } from "react";
import { CameraFilled } from "@ant-design/icons";

const UploadPic = ({
  cameraIconSize,
  color,
  setPhotoURL,
  setModalVisible,
  setUploadError,
}) => {
  const imgUpload = useRef(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 20971520) {
      setUploadError("Please upload an image of size less than 20 MB.");
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
        <CameraFilled style={{ fontSize: cameraIconSize, color: color }} />
      </button>
    </div>
  );
};

export default UploadPic;
