import React from "react";
import styled from "styled-components";

//Local
import User from "./User";

// Constants
import { mq } from "constants/theme";

const HorizontalRule = styled.hr`
  display: none;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(243, 244, 254, 1);
    display: block;
    max-width: 325px;
  }
`;

const Users = ({
  isAuthenticated,
  filteredUsers,
  highlightWords,
  loadUsers,
  user
}) => (
  <div className="feed-users">
    {Object.keys(filteredUsers).map((key) => (
      <>
        <User
          currentUser={filteredUsers[key]}
          includeProfileLink={true}
          loadUsers={loadUsers}
          isAuthenticated={isAuthenticated}
          user={user}
          key={key}
          highlightWords={highlightWords}
        />
        <HorizontalRule />
      </>
    ))}
  </div>
);

export default Users;
