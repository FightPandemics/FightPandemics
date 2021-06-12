import { Input } from "antd";
import { mq, theme } from "constants/theme";
import styled from "styled-components";
import { Modal, Button, Switch } from "antd";

const { colors } = theme;
const { TextArea } = Input;

export const JoinPositionStyles = styled.div`
  height: 33px;
  margin: 40px 0px 63px 15px;
  font-family: Poppins;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #282828;
`;

export const DescContainer2 = styled.div`
    width: 100%;
    height: 200px;
    padding: 20px 16px 30px 16px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);
    border: solid 0 #979797;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
  `;

export const FPSwitch = styled(Switch)`
background-color: ${(props) =>
    props?.checked ? theme.colors.royalBlue : theme.colors.mediumGray};
margin: 40px 50px 63px 0px;
`;

export const DescContainer = styled.div`
width: 100%;
height: 200px;
padding: 20px 16px 30px 16px;
box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);
border: solid 0 #979797;
background-color: #ffffff;
display: flex;
flex-direction: column;
`;

export const HeaderTitle = styled.div`
font-family: Poppins;
font-weight: normal;
font-stretch: normal;
font-style: normal;
letter-spacing: normal;
text-align: left;
color: black;
margin-bottom: 31px;
`;

// export const StyledTextarea = styled.textarea`
export const StyledTextarea = styled(TextArea)`
width: 100%;
height: 100%;
`;

export const Label = styled.label`
cursor: pointer;
color: #425af2;
float: right;
`;

export const DisplayText = styled.label`
display: block;
overflow: hidden;
`;

export const StyledPostButton = styled(Button)`
color: blue;
font-weight: ${({ name }) => {
    switch (name) {
      case "post":
        return "bold";
    }
  }};
`;

export const StyledPositionModal = styled(Modal)`
.ant-modal-title {
  text-align: center;
}
.ant-modal-footer {
  border-top: 0px;
}
.ant-modal-header {
  border-bottom: 0px;
}
`;

export const StyledConfirmModal = styled(Modal)`
.ant-modal-header,
.ant-modal-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ant-modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ant-modal-footer {
  border-top: 0px;
}
.ant-modal-header {
  border-bottom: 0px;
}
p:first-child {
  font-weight: bold;
}
`;

export const ConfirmButton = styled(Button)`
width: 195px;
height: 43px;
flex-grow: 0;
padding: 12px 76px 12px;
border-radius: 100px;
background-color: #425af2;
`;
