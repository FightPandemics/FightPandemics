import { List as AntList } from "antd";
import ProfileListItem from "components/Profile/ProfileListItem";
import { theme } from "constants/theme";
import React from "react";
import styled from "styled-components";

const { colors } = theme;

const ListContainer = styled.div`
  overflow: hidden;
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
  filteredOrgs,
  loadNextPage,
  totalCount,
  isOwner,
  isSelf
}) => {

  const items = Object.entries(filteredOrgs);

  return (
    <>
      {
        <ListContainer>
          <AntList
            itemLayout="horizontal"
            loadMore={
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
                    isOwner={isOwner}
                    isSelf={isSelf}
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
