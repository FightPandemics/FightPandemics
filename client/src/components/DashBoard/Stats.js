import React from "react";
import { Doughnut, Radar, Line } from "react-chartjs-2";
import { Row, Col } from "antd";
import moment from "moment";

const POSSIBLE_REASONS = [
  "Spam",
  "Inappropriate Content",
  "Other",
  "Violates Terms",
];

const last30Days = [...new Array(30)].map((i, idx) =>
  moment().startOf("day").subtract(idx, "days").format("DD MMM"),
);

function Stats({ stats }) {
  if (!stats) return null;

  const getReasonsCountsByType = (dataObject) => {
    return POSSIBLE_REASONS.map((reason) => {
      return dataObject.find((e) => e._id === reason)?.count || 0;
    });
  };

  const getLast30DaysStats = (dataObject) => {
    return last30Days.map((day) => {
      return (
        dataObject.find((e) => {
            console.log(moment(e._id).format("DD MMM"))
          return moment(e._id).format("DD MMM") === day;
        })?.count || 0
      );
    });
  };

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row" span={12}>
          <h1>Reports handeling</h1>
          <Doughnut
            data={{
              datasets: [
                {
                  data: [
                    stats.pendingPostsCount[0].count,
                    stats.keptPostsCount[0].count,
                    stats.removedPostsCount[0].count,
                  ],
                  backgroundColor: ["#2888d155", "#ff220055", "#11ff0055"],
                  borderColor: ["#2888d1", "#ff2200", "#11ff00"],
                },
              ],
              labels: ["Pending", "Removed", "Kept"],
            }}
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <h1>Reasons trends</h1>
          <Radar
            data={{
              datasets: [
                {
                  data: getReasonsCountsByType(stats.removedReportReasonCounts),
                  fill: true,
                  label: "Removed",
                  backgroundColor: "#ff220055",
                  borderColor: "#ff2200",
                  borderWidth: 1,
                },
                {
                  data: getReasonsCountsByType(stats.KeptReportReasonCounts),
                  fill: true,
                  label: "Kept",
                  backgroundColor: "#11ff0055",
                  borderColor: "#11ff00",
                  borderWidth: 1,
                },
                {
                  data: getReasonsCountsByType(stats.pendingReportReasonCounts),
                  fill: true,
                  label: "Pending",
                  backgroundColor: "#2888d155",
                  borderColor: "#2888d1",
                  borderWidth: 1,
                },
              ],
              labels: POSSIBLE_REASONS,
            }}
          />
        </Col>
        <Col className="gutter-row" span={24}>
          <h1>Daily reports & decisions</h1>
          <Line
            data={{
              datasets: [
                {
                  data: getLast30DaysStats(stats.dailyGroupedCounts),
                  backgroundColor: "#c55ce655",
                  borderColor: "#c55ce6",
                  label: "Reports Per Day (last 30 days)",
                },
                {
                  data: [...new Array(30)].map((i) => 0),
                  borderColor: "#11ff00",
                  label: "Approves Per Day (last 30 days)",
                },
                {
                  data: [...new Array(30)].map((i) => 0),
                  borderColor: "#ff2200",
                  label: "Rejects Per Day (last 30 days)",
                },
              ],
              labels: last30Days
            }}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          />
        </Col>
      </Row>
    </>
  );
}

export default Stats;
