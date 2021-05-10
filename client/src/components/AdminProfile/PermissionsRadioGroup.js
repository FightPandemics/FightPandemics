import React from "react";
import { Radio, Collapse } from "antd";
import BaseButton from "components/Button/BaseButton";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { colors, typography } = theme;

const RadioContainer = styled(Radio.Group)`
   margin-top: 10rem;
   margin-bottom: 20rem;
   width: 100% !important;
    /* .ant-radio-group .ant-radio-group-outline {
        width: 100% !important;
    } */
    .ant-radio-wrapper {
        width: 100%;
        /* background-color: magenta; */
        max-height: 33px; // normal height for unchecked
        /* max-height: 300px; // testing height */
        overflow: hidden;
        /* transition: all .25s ease; */
        /* display: flex; */
        display: flex;
        margin: 0;
        padding: 0 1.5rem;
        margin-bottom: 5rem;
        /* padding: 1.5rem; */
        span:nth-child(2){
        /* background-color: blue; */
        display: flex;
        align-items: center;
        align-self: center;
        transition: max-height .25s ease;
    }


    span:nth-child(2) {
        grid-area: c;
        position: relative;
        flex: 1 1 auto;
    }

    h3, .radio-title{
        font-size: 2.2rem;
        line-height: normal;
        margin: 0;
        display: flex;
        justify-content: space-between;
        font-weight: 500;
        letter-spacing: 0.04rem;

        /* grid-area: c; */
    }

    h4 {
        font-family: 'Poppins';
        font-size: 1.6rem;
        margin-bottom: 2.1rem;
        font-weight: 500;

    }

    /* .permissions {
        grid-area: l;
        position: absolute;
    } */

    .ant-radio {
        display: flex;
        grid-area: b;
        align-items: center;
        flex: 0 0 auto;
        
    }
    .ant-radio span {
        /* align-self: center; */
        position: absolute;
        top: .5rem;
        color: magenta;
    }

    .ant-radio-input {
        /* grid-area: b; */
        color: magenta;
    }

    .ant-radio-inner {
        display: none;
        border: .1em solid ${colors.royalBlue};
        ::after {
            background-color: ${colors.royalBlue};
        }
    }

    }
    
    .ant-radio-wrapper-checked {
        max-height: 100%;
        box-shadow: 0 4px 20px 0 ${colors.shadowBlack};
        padding: 1.5rem;
        /* box-shadow: 1px 1px 15px 10px #000000; */
        transition: max-height .25s ease;
        z-index: 99;
    }

    .radio-title::after{
        content: " +";
        font-size: 1.5rem;
        /* position: absolute; */
        /* right: 0;
        top: 0; */
        align-self: center;
        
    }

    
    .radio-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-left: 6rem;
        overflow: hidden;
    }

   

    .permissions {
        margin: 0;

        li {
           font-size: 1.6rem;
           font-family: 'Work Sans';
           line-height: 1.9rem;
           /* margin-bottom: 1.5rem; */
           list-style-position: inside;
        }

        li::marker {
        color: ${colors.royalBlue} !important;
    }

    }
    

    .ant-radio-wrapper .permissions {
        max-height: 0;
        overflow: hidden;
    }

    /* .ant-radio-wrapper-checked .permissions {
        max-height: 100%;
    } */

    .ant-radio-wrapper-checked {
        
        .radio-title::after {
        content: " -";
        font-size: 2rem;
        font-weight: 500;
        }

        h3 {
            margin-bottom: 3rem !important;
        }
        
        .permissions {
        max-height: 100%;
    }
     
        /* position: absolute; */
        /* right: 0; */
    }

    .list-items {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .ant-radio-checked::after {
        display: none;
    }

`;

export const PermissionsApplyButton = styled(BaseButton)`
    border-radius: 4.6rem;
    background-color: ${colors.royalBlue};
    color: ${colors.white} !important;
    font-family: ${typography.display};
    font-weight: 500;
    font-size: 1.6rem;
    display: block;
    max-width: 33.4rem;
    width: 33.4rem;
    height: 5.4rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    font-size: 1.4rem;
    width: 15.5rem;
    height: 4.8rem;
  }
`;


const PermissionsRadioGroup = (props) => {

    const handleChange = (event) => {
        props.onChange(event.target.value);
    }
    return (
        <>
            <RadioContainer
                onChange={handleChange}
            >
                <Radio

                    className="option" value="Volunteer" key="volunteer">
                    <div className="radio-content">
                        <h3 className="radio-title">Volunteer</h3>


                        <ul className="permissions">
                            <h4>Role Permisions:</h4>
                            <div className="list-items">
                                <li>Will be given a member badge</li>
                                <li>Can see org members’ permissions</li>
                            </div>
                        </ul>
                    </div>
                </Radio>

                <Radio className="option" value="orgwiki" key="orgwiki">
                    <div className="radio-content">
                        <h3 className="radio-title">Org Wiki Editor</h3>


                        <ul className="permissions">
                            <h4>Role Permisions:</h4>
                            <div className="list-items">
                                {// TODO - need role/permission text
                                }
                                <li>Lorem ipsum dolor si libero reiciendis quo non.</li>
                                <li>Deleniti sunt, soluta ea laboriosam, necessitatibus nisi ad, obcaecati.</li>
                            </div>
                        </ul>
                    </div>
                </Radio>

                <Radio className="option" value="administrator" key="administrator">
                    <div className="radio-content">
                        <h3 className="radio-title">Administrator</h3>


                        <ul className="permissions">
                            <h4>Role Permisions:</h4>
                            <div className="list-items">
                                {// TODO - need role/permission text
                                }
                                <li>Lorem ipsum dolor si.</li>
                                <li> Nesciunt odio suscipit laudantium minus harum saepe velit quisquam.</li>
                            </div>
                        </ul>
                    </div>
                </Radio>
            </RadioContainer>
        </>
    )

}

export default PermissionsRadioGroup;