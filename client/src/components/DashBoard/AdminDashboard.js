import { Input, Select } from "antd";

import AdDashboard from "components/AdminDashboard/Dashboard";
import React from "react";
import { WhiteSpace } from "antd-mobile";

const { Option } = Select;

const { Search } = Input;

//we get the id from the input here
const onSearch = (value) => console.log(value);

const dataSource = [
  {
    key: "1",
    name: "Zayd",
    role: ["Super Admin"],
  },
  {
    key: "2",
    name: "Camila",
    role: ["Super Admin"],
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Role",
    key: "select",
    render: (select) => (
      <Select defaultValue="Reader" style={{ width: "16rem" }}>
        <Option value="SuperAdmin">Super Admin</Option>
        <Option value="Admin">Admin</Option>
        <Option value="Moderator">Moderator</Option>
        <Option value="Reader">Reader</Option>
      </Select>
    ),
  },
  {
    title: "Remove",
    key: "remove",
    render: (text) => <a className="delete">X</a>,
  },
];

function AdminDashboard() {
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
      <AdDashboard dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default AdminDashboard;
