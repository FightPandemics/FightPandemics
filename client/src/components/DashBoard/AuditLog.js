import { Table, Tag } from "antd";

import { Link } from "react-router-dom";
import React from "react";
import TextAvatar from "components/TextAvatar";

const auditLogsColumns = [
  {
    title: "Moderator",
    dataIndex: "moderator",
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
    title: "Action",
    dataIndex: "action",
    render: (action) => (
      <>
        <Tag color={action === "accept" ? "green" : "red"} key={action}>
          {action.toUpperCase()}
        </Tag>
      </>
    ),
  },
  {
    title: "Justification",
    dataIndex: "justification",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
  },
  {
    title: "Post",
    dataIndex: "postId",
    render: (postId) => (
      <>
        <Link style={{ color: "blue" }} to={`post/${postId}`}>
          View Post
        </Link>
      </>
    ),
  },
];

function AuditLog({ logs }) {
  return <Table dataSource={logs || []} columns={auditLogsColumns} />;
}

export default AuditLog;