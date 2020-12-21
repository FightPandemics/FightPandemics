import React from "react";
import { WhiteSpace } from "antd-mobile";
import { Input, Select, Table } from "antd";
import axios from "axios";
import styled from "styled-components";

import TextAvatar from "components/TextAvatar";
import { ROLES } from "constants/permissions";
import { theme } from "constants/theme";
import { getInitialsFromFullName } from "utils/userInfo";

const { colors } = theme;
const { Option } = Select;
const { Search } = Input;

const StyledAdminDashboard = styled(Table)`
  padding: 1rem;
  border-radius: 0.2rem;
  .delete {
    font-weight: 700;
    color: ${colors.red};
    font-size: 3rem;
    width: 100%;
    text-align: center;
  }
  small {
    display: block;
    color: ${colors.darkGray};
    margin-left: 5rem;
  }
`;

function AdminDashboard({ users, setToggleRefetch, toggleRefetch }) {
  const saveChanges = async (userId, role) => {
    const endpoint = `/api/users/${userId}/permissions`;
    try {
      await axios.patch(endpoint, { role });
      setToggleRefetch(!toggleRefetch);
    } catch (e) {
      console.log(e);
      alert("Something went wrong.");
    }
  };

  //we get the id from the input here
  const onSearch = async (value) => {
    if (!value) return;
    // ObjectId validation regex
    if (!/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(value))
      return alert("Invalid ID");
    const endpoint = `/api/users/${value}/permissions`;
    try {
      await axios.patch(endpoint, { role: "reader" });
      setToggleRefetch(!toggleRefetch);
    } catch (e) {
      console.log(e);
      alert("Something went wrong.");
    }
  };

  const columns = [
    {
      title: "Name",
      render: (user) => (
        <>
          <TextAvatar
            style={{ display: "inline-block" }}
            mobile={true}
            src={user.photo}
          >
            {getInitialsFromFullName(user.name)}
          </TextAvatar>{" "}
          {user.name}
          <small>ID: {user._id}</small>
        </>
      ),
    },
    {
      title: "Role",
      render: (user) => {
        const selectableRoles = Object.keys(ROLES);
        selectableRoles.shift(); // remove role "user"
        const userRoles = selectableRoles.filter(
          (perm) => ROLES[perm] === user.permissions,
        );
        const highestRole = userRoles[userRoles.length - 1]; // mostly length === 1
        return (
          <Select
            onChange={(value) => saveChanges(user._id, value)}
            value={highestRole}
            style={{ width: "16rem" }}
            disabled={user.permissions === ROLES.administrator}
          >
            {selectableRoles.map((permLevel) => (
              <Option value={permLevel}>{permLevel}</Option>
            ))}
          </Select>
        );
      },
    },
    {
      dataIndex: "permissions",
      render: (permissions, user) => {
        if (permissions === ROLES.administrator) return null;
        return (
          <a
            onClick={() => {
              if (window.confirm("Are you sure?"))
                saveChanges(user._id, "user");
            }}
            className="delete"
          >
            &times;
          </a>
        );
      },
    },
  ];

  return (
    <div className="StyledAdminDashboard">
      <WhiteSpace size="xl" />
      <Search
        placeholder="Enter a Profile ID"
        allowClear
        enterButton="Add"
        onSearch={onSearch}
        style={{
          width: 200,
          margin: "0 10px",
          width: "30%",
        }}
      />
      <StyledAdminDashboard dataSource={users} columns={columns} />
    </div>
  );
}

export default AdminDashboard;
