import { Input, Select } from "antd";
import axios from "axios";
import AdDashboard from "components/AdminDashboard/Dashboard";
import React from "react";
import { WhiteSpace } from "antd-mobile";
import TextAvatar from "components/TextAvatar";
import PERMISSIONS from "constants/permissions";

const { Option } = Select;

const { Search } = Input;

function AdminDashboard({ users, setToggleRefetch, toggleRefetch }) {
  const saveChanges = async (userId, permLevel) => {
    const endpoint = `/api/users/${userId}/permissions`;
    try {
      await axios.patch(endpoint, { level: permLevel });
      setToggleRefetch(!toggleRefetch);
    } catch (e) {
      console.log(e);
      alert("Something went wrong.");
    }
  };

  //we get the id from the input here
  const onSearch = async (value) => {
    if (!value) return;
    if (!/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(value))
      return alert("Invalid ID");
    const endpoint = `/api/users/${value}/permissions`;
    try {
      await axios.patch(endpoint, { level: "reader" });
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
            {user.name}
          </TextAvatar>{" "}
          {user.name}
          <small>ID: {user._id}</small>
        </>
      ),
    },
    {
      title: "Role",
      render: (user) => {
        const userPerms = Object.keys(PERMISSIONS)
          .map((perm) => (PERMISSIONS[perm] & user.permissions ? perm : null))
          .filter(Boolean);
        const highestPerm = userPerms[userPerms.length - 1];
        return (
          <Select
            onChange={(value) => saveChanges(user._id, value)}
            value={highestPerm}
            style={{ width: "16rem" }}
            disabled={user.permissions & PERMISSIONS.administrator}
          >
            {Object.keys(PERMISSIONS).map((permLevel) => (
              <Option value={permLevel}>{permLevel}</Option>
            ))}
          </Select>
        );
      },
    },
    {
      dataIndex: "permissions",
      render: (permissions, user) => {
        if (permissions & PERMISSIONS.administrator) return null;
        return (
          <a
            onClick={() => {
              if (window.confirm("Are you sure?")) saveChanges(user._id, "user");
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
    <div className="AdDashboard">
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
      <AdDashboard dataSource={users} columns={columns} />
    </div>
  );
}

export default AdminDashboard;
