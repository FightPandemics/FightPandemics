import { List as AntList } from "antd";
import Loader from "components/Feed/StyledLoader";
import ProfileListItem from "components/OrganisationProfile/ProfileListItem";
import { theme } from "constants/theme";
import React from "react";
import styled from "styled-components";

const { colors } = theme;

const ListContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 1.2rem;
  overflow: hidden;
  margin-top: 0.3rem;
  box-shadow: 0 0 20px 0 ${colors.shadowBlack};
  .ant-list-empty-text {
     display: none;
  }

`;

const LoadMoreButton = styled.div`
  color: ${colors.royalBlue};
  justify-self: center;
  text-align: center;
  margin: auto;
  width: fit-content;
  :hover {
    cursor: pointer !important;
   }
`;

const ItemContainer = styled.div`

.ant-list-item a{
  width: 100%;
}
`;

const ProfileList = ({
  filteredApplicants,
  filteredMembers,
  filteredOrgs,
  loadNextPage,
  isNextPageLoading,
  totalCount,
  organisationId,
  isOwner,
  isMember,
  isAdmin,
  isWiki,
  isVolunteer,
  activeTab,
  listInitialized,
  tab
}) => {
  const applicantsList = filteredApplicants && true;
  const membersList = filteredMembers && true;
  const orgsList = filteredOrgs && true;

  const items = Object.entries(
    filteredApplicants || filteredMembers || filteredOrgs,
  );
  return (
    <>
      {
        < ListContainer >
          <AntList
            itemLayout="horizontal"
            loadMore={
              !listInitialized || isNextPageLoading ?
                <Loader /> :
                items.length >= totalCount ? null :
                  <LoadMoreButton onClick={loadNextPage}>
                    Load More
                  </LoadMoreButton>
            }
            dataSource={items}
            renderItem={item => (
              <ItemContainer>
                <AntList.Item
                >
                  <ProfileListItem
                    style={{ width: "100%", display: "flex" }}
                    item={item[1]}
                    applicantsList={applicantsList}
                    membersList={membersList}
                    orgList={orgsList}
                    organizationId={organisationId}
                    isOwner={isOwner}
                    isMember={isMember}
                    isAdmin={isAdmin}
                    isWiki={isWiki}
                    isVolunteer={isVolunteer}
                    activeTab={activeTab}
                    tab={tab}
                  />
                </AntList.Item>
              </ItemContainer>
            )}
          />
        </ListContainer>
      }
    </>
  )
};

export default ProfileList;
