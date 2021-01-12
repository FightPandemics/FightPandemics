import React from "react";
import styled from "styled-components";
import { Card, WhiteSpace } from "antd-mobile";
import { theme } from "constants/theme";
import { useTranslation } from "react-i18next";

const { colors, typography } = theme;
const {
  royalBlue,
  orangeRed,
  mintGreen,
  lightGray,
  darkerGray,
  white,
} = colors;
const { medium, large } = typography.size;

const FacilityTypeCard = styled(Card)`
  background-color: ${white};
  border: 0.1rem solid ${lightGray};
  transition: all 0.3s;
  padding: 1rem;
  border-radius: 0.2rem;
  width: 100%;
  .am-card-header {
    margin-right: 0;
  }
  .am-card-header-content {
    margin-right: 0;
    font-weight: bold;
    color: ${darkerGray};
    flex-basis: 65%;
  }
  .am-card-body::before {
    display: none !important;
  }
  .am-card-body {
    border-top: 0;
    color: rgba(0, 0, 0, 0.5);
    padding-top: 0;
  }
  .am-card-footer {
    font-weight: bold;
    color: ${royalBlue};
    font-size: ${large};
    margin-right: 0;
  }
  .am-card-header-extra {
    margin-right: 0;
    flex-basis: 30%;
    font-size: ${medium};
  }
  .am-card-footer-content {
    font-weight: 600;
    color: ${royalBlue};
    margin-right: 0;
  }
  .am-card-footer-extra {
    font-size: ${large};
    margin-right: 0;
  }
`;

const openDateStyles = {
  paddingTop: ".8rem",
  fontWeight: "500",
};

const urlStyles = {
  paddingTop: ".8rem",
  fontWeight: "500",
  color: royalBlue,
};

const FacilityCard = (props) => {
  const {
    facilityName,
    facilityAddress,
    contactNo,
    distance,
    isOpen,
    periods,
    floating,
    url,
  } = props;

  const cardWidth = floating ? "300px" : "100%";
  const { t } = useTranslation();
  const days = [
    t("dates.weekdaysShort.sunday"),
    " " + t("dates.weekdaysShort.monday"),
    " " + t("dates.weekdaysShort.tuesday"),
    " " + t("dates.weekdaysShort.wednesday"),
    " " + t("dates.weekdaysShort.thursday"),
    " " + t("dates.weekdaysShort.friday"),
    " " + t("dates.weekdaysShort.saturday"),
  ];
  const open24Hours = t("nearestHsp.open24Hours");
  const open = t("nearestHsp.open");
  const closed = t("nearestHsp.closed");
  const and = t("nearestHsp.and");
  const forDirAndMore = t("nearestHsp.forDirAndMore");

  const getOpenDays = (periods) => {
    //missing periods from google api indicates no information in regards to days/hours open
    if (periods.length === 0) return "";
    //a particular setting of periods from google api indicates open 24 hours
    if (
      periods.length === 1 &&
      periods[0].open.day === 0 &&
      periods[0].open.time === "0000"
    )
      return open24Hours;
    //The first .map converts the periods to a simple structure.   Note that from google api
    // a particular day can have multiple time periods that apply, so these are repeated
    // for the day of the week with the varying time(s).
    //The reduce takes objects that have the same day of the week, group them together (.i.e.
    // putting their time in the same array), as in : ["1100 - 1400", "1900 - 2200"], if
    // multiple times are involved with that day.
    //The second map maps the index to days array to get the label of the day, depending
    // on the previous array.
    const openingHours = periods
      .map((p) => ({
        day: p.open.day,
        time: `${p.open.time} - ${p.close.time}`,
      }))
      .reduce(
        (accumulator, current) => {
          let time = accumulator[current.day];
          time.push(current.time);
          return Object.assign([], accumulator, { [current.day]: time });
        },
        days.map((d) => []),
      )
      .map((p, index) => {
        const status = p.length === 0 ? closed : p.join(and);
        return `${days[index]}: ${status}`;
      });

    return openingHours.toString();
  };

  const renderURL = () => {
    return (
      url && (
        <a
          href={url}
          key={facilityName}
          target="_blank"
          rel="noopener noreferrer"
        >
          {forDirAndMore}
        </a>
      )
    );
  };

  return (
    <div>
      <WhiteSpace size="lg" />
      <FacilityTypeCard
        full
        style={{ width: cardWidth, backgroundColor: "white" }}
      >
        <Card.Header
          title={facilityName}
          extra={
            {
              true: <span style={{ color: `${mintGreen}` }}>{open}</span>,
              false: <span style={{ color: `${orangeRed}` }}>{closed}</span>,
              "": <span></span>,
            }[isOpen]
          }
        />
        <Card.Body>
          <div>{facilityAddress}</div>
          <div style={openDateStyles}>{getOpenDays(periods)}</div>
          <div style={urlStyles}>{renderURL()}</div>
        </Card.Body>
        <Card.Footer content={contactNo} extra={distance} />
      </FacilityTypeCard>
    </div>
  );
};

export default FacilityCard;
