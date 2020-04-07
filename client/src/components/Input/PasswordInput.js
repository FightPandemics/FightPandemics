// import React, { useRef, useState } from "react";
// import styled from "styled-components";

// import withLabel from "./with-label";
// import BaseInput from "./BaseInput";

// import {
//   Visibility as VisibilityIcon,
//   VisibilityOff as VisibilityOffIcon,
// } from "@material-ui/icons";

// const Input = styled(BaseInput).attrs((props) => ({
//   type: props.isVisible ? "text" : "password",
// }))``;

// const StyleEye = {
//   float: "right",
//   marginLeft: "-25px",
//   marginTop: "-10px",
//   position: "relative",
//   zIndex: 2,
//   opacity: 0.5,
// };

// export default ({ label, placeholder, labelStyle, inputStyle, ...props }) => {
//   const [isVisible, setVisible] = useState(false);
//   const passwordRef = useRef();

//   const onToggleVisibility = () => {
//     const { current: input } = passwordRef;
//     setVisible(!isVisible);
//   };

//   const EyeIcon = isVisible ? VisibilityOffIcon : VisibilityIcon;

//   const PasswordField = withLabel(() => (
//     <div>
//       <Input
//         style={inputStyle}
//         placeholder={placeholder}
//         ref={passwordRef}
//         isVisible={isVisible}
//         {...props}
//       />
//       <EyeIcon style={StyleEye} onClick={onToggleVisibility} />
//     </div>
//   ));

//   return <PasswordField label={label} style={labelStyle} />;
// };
