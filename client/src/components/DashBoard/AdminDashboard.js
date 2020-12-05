import { Input, Select } from "antd";

import AdDashboard from "components/AdminDashboard/Dashboard";
import React from "react";
import { WhiteSpace } from "antd-mobile";
import TextAvatar from "components/TextAvatar";
import PERMISSIONS from "constants/permissions";

const { Option } = Select;

const { Search } = Input;

//we get the id from the input here
const onSearch = (value) => console.log(value);

function AdminDashboard({ users }) {
  const saveChnages = () => {
    alert("saved")
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
        </>
      ),
    },
    {
      title: "Role",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions) => {
        return (
          <Select
            onChange={() => saveChnages()}
            defaultValue={permissions}
            style={{ width: "16rem" }}
          >
            {Object.keys(PERMISSIONS).map((permLevel) => (
              <Option value={PERMISSIONS[permLevel]}>{permLevel}</Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Remove",
      key: "remove",
      render: (text) => <a className="delete">X</a>,
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
