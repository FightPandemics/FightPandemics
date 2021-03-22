import React, { forwardRef, useState, useTranslation } from "react";
import styled from "styled-components";

import { blockLabelStyles } from "constants/formStyles";
import { mq, theme } from "constants/theme";
import InputError from "components/Input/InputError";
import InputInfo from "components/Input/InputInfo";
import Label from "components/Input/Label";
// import TextArea from "components/Input/TextArea";
import { Input } from "antd";

const { colors } = theme;

// const ApplyFormInput = styled.input.attrs(({ maxLength, min, max }) => ({
//   maxLength: maxLength || Number.MAX_SAFE_INTEGER,
//   min: min || Number.MIN_SAFE_INTEGER,
//   max: max || Number.MAX_SAFE_INTEGER,
//   triple: "100rem"
// }))`
//   border: none;
//   box-shadow: none;
//   color: ${colors.darkishGray};
//   flex-grow: 2;
//   /* overflow: auto; */
//   font-family: 'Work Sans';
//   padding-bottom: 0.5rem;
//   background-color: transparent;
//   font-size: 1.4rem;
//   line-height: 1.8rem;
//   font-weight: 400;
//   margin: 0;
//   padding-bottom: 0.8rem;
//   width: 100%;
//   /* text-overflow: ellipsis; */
//   flex-basis: 40rem;
//   overflow-wrap: break-word;

//   @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
//     font-size: 1.2rem;
//     height: 5.6rem;
//   }

//   &.text-present {
//     height: 50rem !important;
//   }

// `;
const { TextArea } = Input;
export const InputField = styled(TextArea)`
  /* height: 1em; */
  font-size: 1.4rem;
  /* color: black; */
  resize: none;
  border: none;
  /* width: 87%; */
  border-radius: none;
  padding: 0;
  /* padding: 1.4rem; */
  overflow: hidden;
  &.ant-input:focus,
  &.ant-input-focused {
    box-shadow: unset;
  }
  
  /* border: none; */
  box-shadow: none;
  color: ${colors.darkishGray};
  flex-grow: 2;
  /* overflow: auto; */
  font-family: 'Work Sans';
  /* padding-bottom: 0.5rem; */
  background-color: transparent;
  font-size: 1.4rem;
  line-height: 1.8rem;
  font-weight: 400;
  margin: 0;
  /* padding-bottom: 0.8rem; */
  width: 100%;
  /* text-overflow: ellipsis; */
  flex-basis: 40rem;
  overflow-wrap: break-word;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    font-size: 1.2rem;
    height: 5.6rem;
  }

  &.text-present {
    height: 10rem !important;
  }

`;

export const OuterWrapper = styled.div`
  margin: 1rem auto;
  position: relative;
  text-align: left;
  width: 100%;

  .has-error {
    color: red;
  }
`;

export const InputWrapper = styled.div`
  align-items: center;
  border-bottom: 1px solid ${colors.royalBlue};
  display: flex;
  margin: 0.4rem 0;

  &.has-error {
    border-bottom: 1px solid ${colors.red};
    color: ${colors.red};
  }
`;

const Prefix = styled.span`
  padding-bottom: 0.5rem;
`;

export const CharCounter = styled.p`
  color: ${colors.darkishGray} !important;
  font-size: 1.2rem !important;
  font-weight: 500 !important;
  text-align: right;
  max-width: 40%;
  min-width: 25%;
 
  &.has-error {
  color: ${colors.red} !important;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {

  }
}
`;

export const ErrorMsg = styled.p`
  color: ${colors.red} !important;
  font-family: 'Poppins';
  font-size: 1.4rem;
  /* display: none; */
  position: relative;
  top: 0;
  .has-error {
    color: red;
    display: block;
  }
`;

// export default forwardRef(
//   (
//     {
//       formData,
//       textPresent,
//       register,
//       onChange,
//       onSubmit,
//       onPressEnter,
//       maxLength, inputTitle,
//       name,
//       defaultValue,
//       error,
//       icon,
//       prefix,
//       placeholder,
//       counter,
//       ...props
//     },
//     ref,
//   ) => {
//     const charsLeft =
//       props.maxLength && props.value && props.maxLength - props.value.length;
//     const [count, setCount] = useState(0);

//     // const [textPresent, setTextPresent] = useState(true);

//     return (

//       <OuterWrapper>

//         {/* <Label
//           icon={icon}
//           htmlFor={name}
//           // style={blockLabelStyles}
//           label={inputTitle}
//         /> */}
//         <InputWrapper className={count > 250 ? "has-error" : "" || error && "has-error"}>
//           {prefix && <Prefix>{prefix}</Prefix>}
//           <ApplyFormInput
//             value={count}
//             required
//             className={count > 0 ? "text-present" : ""}
//             // row={rows}
//             name={name}
//             id={name}
//             defaultValue={defaultValue}
//             ref={ref}
//             // placeholder={placeholder}
//             // orgName={orgName}
//             {...props}
//             // maxLength="1"
//             error={error}
//             // onChange={(event) => setCount(event.target.value.length)}
//             // onChange={(e) => alert(e.target.value)}


//           // onChange={setTextPresent(false)}
//           />

//           {// TextArea is for Autosize test
//           }
//           {/* <TextArea
//             autoSize
//             name={name}
//             id={name}
//             defaultValue={defaultValue}
//             ref={ref}
//             error={error}
//             // placeholder={placeholder}
//             {...props}
//             onChange={(event) => setCount(event.target.value.length)}
//           /> */}
//           <CharCounter className={count > 250 ? "has-error" : ""}> {count} / {250} </CharCounter>
//         </InputWrapper>

//         {!props.textPresent && <ErrorMsg className="has-error">Required Field</ErrorMsg>}

//         {
//           typeof charsLeft === "number" && charsLeft !== props.maxLength && (
//             <InputInfo
//               error={charsLeft === 0}
//             >{`${charsLeft} characters left`}


//             </InputInfo>
//           )
//         }
//         {/* {error && <InputError>{error.message}</InputError>} */}
//       </OuterWrapper >
//     );
//   },
// );


const ApplyFormInput = ({
  renderError,
  // formData,
  textPresent,
  register,
  onChange,
  // onSubmit,
  // onPressEnter,
  maxLength, inputTitle,
  name,
  defaultValue,
  error,
  icon,
  prefix,
  placeholder,
  // counter,
  // count,
  ...props
}) => {
  const charsLeft =
    props.maxLength && props.value && props.maxLength - props.value.length;
  // const [count, setCount] = useState(0);

  // const [textPresent, setTextPresent] = useState(true);

  // Components rendered together
  // return (

  //   <OuterWrapper>
  //     <InputField
  //       // rows={10}
  //       onChange={onChange}
  //     />
  //     {/* <Label
  //         icon={icon}
  //         htmlFor={name}
  //         // style={blockLabelStyles}
  //         label={inputTitle}
  //       /> */}



  //     <InputWrapper
  //     // className={count > 250 ? "has-error" : "" || error && "has-error"}
  //     >
  //       {/* {prefix && <Prefix>{prefix}</Prefix>} */}

  //       {//Main testing input
  //       }
  //       {/* <ApplyFormInput
  //         // Main ApplyForm Input for testing    
  //         rows={count > 0 ? 2 : 1}
  //         name={name}
  //         id={name}
  //         // defaultValue={defaultValue}
  //         // ref={ref}
  //         {...props}
  //         // error={error}
  //         onChange={(event) => setCount(event.target.value.length)}


  //       // onChange={setTextPresent(false)}
  //       /> */}
  //       {// LAST WORKING FIELD "Inputfield"

  //       }
  //       {/* <InputField
  //         // rows={10}
  //         onChange={onChange}
  //       /> */}
  //       {// TextArea is for Autosize test
  //       }
  //       {/* <TextArea
  //           autoSize
  //           name={name}
  //           id={name}
  //           defaultValue={defaultValue}
  //           ref={ref}
  //           error={error}
  //           // placeholder={placeholder}
  //           {...props}
  //           onChange={(event) => setCount(event.target.value.length)}
  //         /> */}
  //       {/* <CharCounter className={count > 250 ? "has-error" : ""}> {count} / {250} </CharCounter> */}

  //     </InputWrapper>
  //     {/* <errorMsg className="has-error">{renderError("description")}</errorMsg> */}
  //     {/* {!props.textPresent && <ErrorMsg className="has-error">Required Field</ErrorMsg>} */}

  //     {/* {
  //       typeof charsLeft === "number" && charsLeft !== props.maxLength && (
  //         <InputInfo
  //           error={charsLeft === 0}
  //         >{`${charsLeft} characters left`}


  //         </InputInfo>
  //       )
  //     } */}
  //     {/* {error && <InputError>{error.message}</InputError>} */}

  //   </OuterWrapper >

  // );


};

export default ApplyFormInput;