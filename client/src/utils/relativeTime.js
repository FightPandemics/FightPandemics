import moment from "moment";

export default function (ISODate) {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: (number) => number + " second ago",
      ss: "%d seconds ago",
      m: "1 minute ago",
      mm: "%d minutes ago",
      h: "1 hour ago",
      hh: "%d hours ago",
      d: "1 day ago",
      dd: "%d days ago",
      M: "a month ago",
      MM: "%d months ago",
      y: "a year ago",
      yy: "%d years ago",
    },
  });
  const secondsElapsed = moment().diff(ISODate, "seconds");
  const dayStart = moment().startOf("day").seconds(secondsElapsed);

  if (secondsElapsed > 300) {
    return moment(ISODate).fromNow(true);
  } else if (secondsElapsed < 60) {
    return dayStart.format("s ") + "seconds ago";
  } else {
    const minute = dayStart.format("m ");
    const minuteString = minute > 1 ? " minutes ago" : " minute ago";
    return minute.concat(minuteString);
  }
}
