import React from "react";
import { Doughnut, Radar, Line } from "react-chartjs-2";
import { Row, Col, Statistic, Progress } from "antd";
import { WhiteSpace } from "antd-mobile";

import moment from "moment";

const POSSIBLE_REASONS = [
  "Spam",
  "Inappropriate Content",
  "Other",
  "Violates Terms",
];

const last30Days = [...new Array(30)]
  .map(
    (i, idx) => moment().startOf("day").subtract(idx, "days").format("D/M"), // IMPORTANT: format must match backend
  )
  .reverse();

function Stats({ stats }) {
  if (!stats) return null;

  const getReasonsCountsByType = (dataObject) => {
    return POSSIBLE_REASONS.map((reason) => {
      return dataObject.find((e) => e._id === reason)?.count || 0;
    });
  };

  const getLast30DaysStats = (dataObject, flip) => {
    return last30Days.map((day) => {
      return (
        dataObject.find((e) => {
          return e._id === day;
        })?.count * (flip ? -1 : 1) || 0
      );
    });
  };

  const getTodayStats = (dataObject) => {
    return (
      dataObject.find((e) => {
        return e._id === moment().format("D/M");
      })?.count || 0
    );
  };

  const LineChartScaleMaxMin = Math.max(
    ...getLast30DaysStats(stats.dailyNewReportsCounts),
    ...getLast30DaysStats(stats.auditStats.rejectedReports),
    ...getLast30DaysStats(stats.auditStats.approvedReports),
  );

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
          <h1>Progress</h1>
          <WhiteSpace size={"md"} />
          <Progress
            style={{ maxWidth: "90%" }}
            title={"Progress"}
            strokeColor={{
              "0%": "#ff2200",
              "100%": "#2888d1",
            }}
            percent={
              (stats.pendingPostsCount[0].count *
                (stats.keptPostsCount[0].count *
                  stats.removedPostsCount[0].count)) /
              100
            }
          />
          <WhiteSpace size={"md"} />
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Pending Reports Now"
                value={stats.pendingPostsCount[0].count}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Posts Removed Today"
                value={getTodayStats(stats.auditStats.approvedReports)}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Posts Kept Today"
                value={getTodayStats(stats.auditStats.rejectedReports)}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Reports Received Today"
                value={getTodayStats(stats.dailyNewReportsCounts)}
              />
            </Col>
          </Row>
        </Col>
        <Col className="gutter-row" span={24}>
          <h1>
            Daily reports & decisions<small>(Last 30 Days)</small>
          </h1>
          <Line
            data={{
              datasets: [
                {
                  data: getLast30DaysStats(stats.dailyNewReportsCounts),
                  backgroundColor: "#c55ce655",
                  borderColor: "#c55ce6",
                  label: "Reports received",
                  pointHitRadius: 20,
                },
                {
                  data: getLast30DaysStats(
                    stats.auditStats.rejectedReports,
                    true,
                  ),
                  backgroundColor: "#11ff0055",
                  borderColor: "#11ff00",
                  label: "Posts kept",
                  pointHitRadius: 20,
                },
                {
                  data: getLast30DaysStats(
                    stats.auditStats.approvedReports,
                    true,
                  ),
                  backgroundColor: "#ff220055",
                  borderColor: "#ff2200",
                  label: "Posts removed",
                  pointHitRadius: 20,
                },
              ],
              labels: last30Days,
            }}
            options={{
              responsive: true,
              title: {
                display: true,
                text: "Last 30 days",
              },
              tooltips: {
                mode: "index",
                axis: "x",
                callbacks: {
                  label: function (tooltipItem, data) {
                    let value = tooltipItem.yLabel;
                    return `${data.datasets[tooltipItem.datasetIndex].label}: ${
                      value < 0 ? -value : value
                    } posts`;
                  },
                },
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: -LineChartScaleMaxMin,
                      max: LineChartScaleMaxMin,
                      callback: function (value, index, values) {
                        return value < 0 ? -value : value;
                      },
                    },
                  },
                ],
              },
            }}
          />
        </Col>
        <Col className="gutter-row" span={24}>
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
      </Row>
    </>
  );
}

export default Stats;
