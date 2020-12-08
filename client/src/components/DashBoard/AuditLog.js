import { Table, Tag } from "antd";

import { Link } from "react-router-dom";
import React from "react";
import TextAvatar from "components/TextAvatar";
import FilterTag from "components/Tag/FilterTag";
import { getInitialsFromFullName } from "utils/userInfo";

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
          {getInitialsFromFullName(user.name)}
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
        <Tag color={action === "accept" ? "red" : "green"} key={action}>
          {action === "accept" ? "REMOVE" : "KEEP"}
        </Tag>
      </>
    ),
  },
  {
    title: "Justification",
    dataIndex: "justification",
    render: (justification) => (
      <>
        {justification
          .replace(/[^|]*$/, "")
          .split("|")
          .filter((e) => e)
          .map((reason, idx) => (
            <FilterTag key={idx} disabled={true} selected={false}>
              {reason}
            </FilterTag>
          ))}
        <p>{(justification.match(/([^\|]+$)/) || [])[0]}</p>
        {justification.length === 1 && (
          <FilterTag disabled={true} selected={false}>
            N/A
          </FilterTag>
        )}
      </>
    ),
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    render: (date) => new Date(date).toLocaleString(),
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
