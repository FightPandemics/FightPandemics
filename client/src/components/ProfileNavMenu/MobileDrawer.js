import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme, mq } from "constants/theme";
const { colors } = theme;

const Drawer = styled.div`
    width: 100vw;
    height: 41.1rem;
    position: fixed;
    left: 0rem;
    bottom: 0rem;
    z-index: 999;
    background-color: ${colors.white};
    box-shadow: 0.1rem -0.3rem 1rem -0.2rem #ddd;
    display: ${props => props.drawerIsClosed ? "none" : "initial"};
`;

const DrawerTitleWrapper = styled.div`
    height: 15%;
    text-align: center;
    padding-top: 1.223rem;
`;

const DrawerTitle = styled.h2`
    font-size: 1.6rem;
    font-weight: 700;
`;

const OrgsWrapper = styled.div`
    height: 70%;
    padding-left: 2.1rem;
    padding-bottom: 2rem;
    overflow-y: auto;
`;

const OrgCard = styled.div`
    margin-bottom: 2rem;
`;


const OrgImage  = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin-right: 1.7rem;
    cursor: pointer;
`;

const OrgTitle = styled.span`
    font-size: 1.4rem;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        color: ${theme.colors.royalBlue};
    }
`;

const JoinOrgWrapper = styled.div`
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.1rem;
    border-top: 1px solid rgba(215, 215, 215, 0.3);
    color: ${colors.royalBlue};
`;

const RightSideWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const RoundedButton = styled.button`
    border: none;
    border-radius: 50%;
    font-size: 3.424rem;
    padding: 0 1rem;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #B8C2F8;
    }
`;

const JoinOrgLink = styled(Link)`
    margin-left: 2.6rem;
`;

const DrawerComponent = 
({
    navIsOpened, 
    setNavIsOpened, 
    organisationId,
    setOrganisationId,
    user
}) => {
    const [drawerIsClosed, setDrawerIsClosed] = useState(false);
    let organisations = user ? user.organisations : [];

    return (
        organisations
        ?
        <Drawer drawerIsClosed = {drawerIsClosed}>
            <DrawerTitleWrapper>
                <DrawerTitle>Org Workspace</DrawerTitle>
            </DrawerTitleWrapper>
            <OrgsWrapper>
                {
                organisations.map((org, idx) => {
                    return (
                        <OrgCard 
                            key= {org._id}
                            onClick = {() => {
                            setNavIsOpened(true);
                            setDrawerIsClosed(true);
                            setOrganisationId(idx);
                        }}>
                            <OrgImage src ="https://data.whicdn.com/images/22345458/original.jpg" />
                            <OrgTitle key={idx}>{ org.name }</OrgTitle>
                        </OrgCard>
                    );
                })
            }
            </OrgsWrapper>
            <JoinOrgWrapper>
                <RightSideWrapper>
                    <RoundedButton><span>+</span></RoundedButton>
                    <JoinOrgLink to="/about-us">Join an organization</JoinOrgLink>
                </RightSideWrapper>
                <RoundedButton onClick={ () =>  setDrawerIsClosed(true)}><span>&times;</span></RoundedButton>
            </JoinOrgWrapper>
        </Drawer>
        :
        ""
    );
}

export default DrawerComponent;