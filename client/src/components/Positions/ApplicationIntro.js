import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { theme, mq } from "constants/theme";
import { Link } from "react-router-dom";
import { getInitialsFromFullName } from "utils/userInfo";

const { colors } = theme

const ApplicantCardContainer = styled.div`
margin-top: 5rem;
border-radius: .8rem;
box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
overflow: hidden;
transition: all .5s ease;
`;

const ApplicantCard = styled.div`
    transition: all .5s ease;
.applicant-margin {
    margin: 0 11.9rem;
    transition: all .5s ease;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        margin: 0 5.6rem;
    }
}
`;


const ApplicantTop = styled.div`
    background-color: ${colors.royalBlue};
    position: relative;
    height: 11.7rem;
    display: flex;
    align-items: center;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) { 
        height: 6rem;
    }
`;

const ApplicantAvatar = styled.div`
    background-color: ${colors.white};
    height: 7.3rem;
    width: 7.3rem;
    border-radius: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 2.5rem;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) { 
        height:2.7rem;
        width:2.7rem;
        margin-left: 2rem;
    }
`;

const ApplicantInitials = styled.h3`
    color: ${colors.royalBlue};
    font-size: 2.2rem;
    margin: 0;
    
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        font-size: 1.2rem;
    }
`;

const ApplicantName = styled.h3`
    color: ${colors.white};
    font-size: 2.2rem;
    font-weight: bold;
    letter-spacing: .04rem;
    margin: 0;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        font-size: 1.4rem;
        font-weight: 500;
    }
`;

const ApplicantPosition = styled.p`
    color: ${colors.lightishGray};
    
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        font-size: 1.2rem;
        margin: 0;
    }
`;

const ApplicantBottom = styled.p`
 @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
 .applicant-margin {
     margin: 0 2.2rem;
 } 
 } 
`
const ApplicantIntroTitle = styled.p`
    font-family: 'Poppins';
    font-weight: 600;
    margin-top: 2.6rem;
`;

const AppilcantIntroBody = styled.p`
    font-family: 'Work Sans';
    font-size: 1.6rem;
    overflow: hidden;
    font-style: normal;
    line-height: normal;
    letter-spacing: .1rem;
    max-height: 11rem;
    transition: all .5s ease;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        max-height: 7.5rem;
        letter-spacing: .04rem;
        font-size: 1.3rem;
        color: ${colors.darkishGray};
        margin-bottom: 2rem;
        line-height: normal;
    }
`;

const ApplicantSeeAll = styled.h3`
    text-align: center;
    font-size: 2.2rem;
    font-weight: normal;
    margin: 0;
    color: ${colors.royalBlue};

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        font-size: 1.4rem;
        margin-bottom: 1rem;
    }
`;

const ApplicationIntro = (name, intro, position) => {
    const [introHeight, setIntroHeight] = useState("")
    const [seeAllVisible, setSeeAllVisible] = useState()
    const [seeAllActive, setSeeAllActive] = useState(false)
    const handleSeeAll = async () => {
        setSeeAllActive(true)
        setIntroHeight("100%")
        setSeeAllVisible("none")
    }

    return (
        <ApplicantCardContainer>
            <ApplicantCard>
                <ApplicantTop>
                    <ApplicantAvatar>
                        <ApplicantInitials>
                            {
                                // TODO ENABLE AFTER NAME IS PASSED IN FROM MEMBERPERMISSIONS PAGE
                                // {getInitialsFromFullName(name)}
                            }
                            AS
                    </ApplicantInitials>
                    </ApplicantAvatar>
                    <div className="applicant-margin">
                        <ApplicantName>
                            {
                                // TODO ENABLE AFTER NAME IS PASSED IN FROM MEMBERPERMISSIONS PAGE
                                // {name}
                            }
                            Amy Smith
                        </ApplicantName>
                        <ApplicantPosition>
                            {
                                // TODO ENABLE AFTER POSITION IS PASSED IN FROM MEMBERPERMISSIONS PAGE
                                // {position}
                            }
                            Volunteer
                        </ApplicantPosition>
                    </div>
                </ApplicantTop>
                <ApplicantBottom>
                    <div className="applicant-margin applicant-bottom">
                        <ApplicantIntroTitle>
                            {
                                // SWAP OUT TEXT VIA en_us
                            }
                            Profile
                        </ApplicantIntroTitle>
                        <AppilcantIntroBody
                            style={{ "max-height": seeAllActive && introHeight }}
                        >
                            {
                                // TODO ENABLE AFTER intro IS PASSED IN FROM MEMBERPERMISSIONS PAGE
                                // {intro}
                            }
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non justo vehicula, sollicitudin lorem sit amet, congue lorem. Donec eu bibendum turpis, eget vehicula leo. Donec cursus tristique nulla a eleifend. Aliquam vitae egestas nisl, vitae ullamcorper libero. Curabitur luctus, sem et maximus aliquam, odio tellus placerat justo, ac porta tellus sapien vel sem. Aenean placerat magna mi, eget placerat eros tempus vitae. Suspendisse commodo finibus elementum. Donec quis risus vitae nulla consectetur eleifend at sit amet tellus. Sed vehicula venenatis luctus.
                        </AppilcantIntroBody>
                        <Link
                            onClick={handleSeeAll}
                            style={{ display: seeAllVisible }}
                        >
                            <ApplicantSeeAll>See All</ApplicantSeeAll>
                        </Link>
                    </div>
                </ApplicantBottom>
            </ApplicantCard>
        </ApplicantCardContainer>
    )
};

export default ApplicationIntro;