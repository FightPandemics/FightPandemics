import React from "react";
import { Radio, Collapse } from "antd";
import styled from "styled-components";
import { theme } from "constants/theme";

const { Panel } = Collapse;

const RadioContainer = styled(Radio.Group)`
    
    .ant-radio-wrapper {
        width: 100%;
        background-color: magenta;
        /* max-height: 33px; // normal height for unchecked */
        max-height: 300px; // testing height
        overflow: hidden;
        /* transition: all .25s ease; */
        /* display: flex; */
        display: flex;
        margin: 0;
        padding: 1.5rem;
        span:nth-child(2){
        /* background-color: blue; */
        display: flex;
        align-items: center;
        align-self: center;
    }


    span:nth-child(2) {
        grid-area: c;
        position: relative;
    }

    h3, .radio-title{
        font-size: 2.2rem;
        line-height: normal;
        margin: 0;
        display: flex;
        justify-content: space-between;
        /* grid-area: c; */
    }

    /* .permissions {
        grid-area: l;
        position: absolute;
    } */

    .ant-radio {
        display: flex;
        grid-area: b;
        align-items: center;
        
    }
    .ant-radio span {
        /* align-self: center; */
        position: absolute;
        top: .5rem;
    }

    .ant-radio-input {
        /* grid-area: b; */
    }

    }
    
    .ant-radio-wrapper-checked {
        max-height: 187px;
        transition: all .25s ease;
    }

    .radio-title::after{
        content: " +";
        font-size: 1.5rem;
        /* position: absolute; */
        /* right: 0;
        top: 0; */
        align-self: center;
        
    }

    .ant-radio-wrapper-checked .radio-title::after {
        content: " -";
        /* position: absolute; */
        /* right: 0; */
    }

    .radio-content {
        display: flex;
        flex-direction: column;
        margin-left: 6rem;
        overflow: hidden;
    }

    .ant-radio-wrapper .permissions {
        max-height: 100%;
        overflow: hidden;
    }

    .ant-radio-wrapper-checked .permissions {
        max-height: 0;
    }

`;


const PermissionsRadioGroup = () => {
    return (
        <>
            <RadioContainer>
                <Radio name="test name" className="option" value="option 1" key="1">
                    <div className="radio-content">
                        <h3 className="radio-title">Role Permisions:</h3>
                        <ul className="permissions">
                            <li>Will be given a member badge</li>
                            <li>Can see org members’ permissions</li>
                        </ul>
                    </div>
                </Radio>
                <Radio value="option 2" key="2">
                    <div className="radio-content">
                        <h3 className="radio-title">Role Permisions:</h3>
                        <ul className="permissions">
                            <li>Will be given a member badge</li>
                            <li>Can see org members’ permissions</li>
                        </ul>
                    </div>
                </Radio>
            </RadioContainer>
        </>
    )

}

export default PermissionsRadioGroup;