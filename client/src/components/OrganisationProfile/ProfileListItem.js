import React from "react";
import { Link } from "react-router-dom";
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

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
    justify-content: center;
`;

export const Name = styled.p`
    color: ${colors.black};
    font-size: 1.6rem;
    line-height: 1.9rem;
    font-weight: 400;
    margin: 0;
    
`;

export const Title = styled.p`
    font-size: 1rem;
    line-height: 1.8rem;
    color: rgba(0, 0, 0, 0.5);
    color: ${colors.lightishGray};
    opacity: 50%;
    margin: 0;
    margin-top: 1rem;
`;

const ProfileListItem = ({ item, applicantsList, membersList, orgsList }) => {

    let itemState
    let list
    let itemPath
    if (applicantsList) {
        list = "applicant"
        itemPath = `/application/${item._id}`
        itemState = {
            "applicant": item,
            "applicantId": item?._id,
        }
    }

    if (membersList) {
        list = "member"
        itemPath = `/profile/${item?.[list]?.id}`
        itemState = {
            "member": item,
            "applicantId": item?._id,
        }
    }

    if (orgsList) {
        list = "organisation"
    }

    return (
        <Link
            to={{
                pathname: itemPath,
                state: [itemState, {
                    from: window.location.href,
                }],
            }}
        >
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
                    <TextContainer>
                        <Name>
                            {item?.[list]?.name && item?.[list]?.name || ""}
                        </Name>
                        {applicantsList ? "" :
                            <Title>
                                {
                                    //ORG PERMISSIONS OR POSITION TITLE
                                    orgsList ?
                                        // org permissions prop (test placeholder is below)
                                        ("Editor")
                                        :
                                        // member position title prop (test placeholder is below)
                                        ("Volunteer")
                                }
                            </Title>}
                    </TextContainer>
                </ProfileContainer>
            </AllItems>
        </Link>
    )
}

export default ProfileListItem;