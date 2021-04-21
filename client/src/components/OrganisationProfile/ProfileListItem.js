import React from "react";
import styled from "styled-components";
import { theme } from "constants/theme";
import { getInitialsFromFullName } from "utils/userInfo";
const { colors } = theme;


export const AllItems = styled.div`
`;

export const ProfileContainer = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
margin: .5rem 0;
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
padding: 0 1rem;

`;

export const ProfilePicContainer = styled.div`
display: flex;
align-items: center;
justify-self: flex-start;
justify-content: center;
margin: 1rem 0;
border-radius: 50%;
border: 0.1rem solid ${colors.royalBlue};
color: ${colors.royalBlue};
width: 4rem;
height: 4rem;
text-align: center;
font-size: 1.6rem;
font-weight: 500;
line-height: 2rem;
`;

export const ProfilePic = styled.div`
    font-size: 1.5rem;
`;

export const Name = styled.p`
    color: ${colors.black};
    font-size: 1.6rem;
    line-height: 1.9rem;
    font-weight: 400;
    margin: 0;
    margin-left: 2rem;
`;

const ProfileListItem = ({ item, applicantsList, membersList, orgsList }) => {

    let list
    if (applicantsList) {
        list = "applicant"
    }
    if (membersList) {
        list = "member"
    }
    if (orgsList) {
        list = "organisation"
    }

    return (
        <AllItems>
            <ProfileContainer>
                <ProfilePicContainer>
                    <ProfilePic>
                        {
                            item?.[list]?.photo ?
                                (<img
                                    style={{
                                        maxWidth: "100%",
                                        borderRadius: "50%",
                                        boxSizing: "content-box",
                                    }}
                                    src={item?.[list]?.photo}
                                />)
                                :
                                orgsList ?
                                    (<img 
                                    // src will be org profile generic image
                                    />)
                                    :
                                    (item?.[list]?.name && getInitialsFromFullName(item?.[list]?.name) || "")}
                    </ProfilePic>
                </ProfilePicContainer>
                <Name>
                    {item?.[list]?.name && item?.[list]?.name || ""}
                </Name>
            </ProfileContainer>
        </AllItems>
    )
}

export default ProfileListItem;