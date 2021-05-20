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
flex-wrap: wrap;
margin: .25rem 0;
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
padding: .5rem 1rem;
/* padding-bottom: .5rem; */

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
background-color: ${colors.selago};
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

export const Permissions = styled.div`
    font-family: 'Work Sans';
    font-size: 1rem;
    line-height: 1.8rem;
    color: ${colors.mediumishGray};
    opacity: 50%;
    margin: 0;
    margin-top: .2rem;
    width: 100%;
    position: absolute;
    bottom: .2rem;
    /* margin: 1rem 0; */
`;

const ProfileListItem = ({ item, applicantsList, membersList, orgsList, organizationId }) => {

    let itemState
    let list
    let itemPath
    if (applicantsList || membersList) {
        list = "applicant"
        itemPath = `/application/${item?.organization?.id}/${item?._id}`
        itemState = {
            "applicant": item,
            "applicantId": item?._id,
        }
    }

    if (membersList) {
        // list = "member"
        itemPath = `/profile/${item?.[list]?.id}`
        itemState = {
            "applicant": item,
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
                state:
                {
                    name: item?.[list]?.name,
                    from: window.location.href,
                },
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
                        {applicantsList ? null :
                            <Permissions>
                                {
                                    //ORG PERMISSIONS
                                    orgsList ?
                                        // org permissions prop (test placeholder is below)
                                        "(Editor)"
                                        :
                                        // member position title prop (test placeholder is below)
                                        // item?.[list].organization.permissions
                                        "(Volunteer)"
                                }
                            </Permissions>}
                    </TextContainer>

                </ProfileContainer>
            </AllItems>
        </Link>
    )
}

export default ProfileListItem;