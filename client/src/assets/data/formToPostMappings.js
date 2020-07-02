import moment from "moment";

import createPostSettings from "assets/data/createPostSettings";

const { expires } = createPostSettings;

const forever = expires.options[0].value;
const month = expires.options[1].value;
const week = expires.options[2].value;
const day = expires.options[3].value;

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: day,
    s: day,
    m: day,
    mm: day,
    h: day,
    hh: day,
    d: day,
    dd: week,
    M: month,
    MM: forever,
    y: forever,
    yy: forever,
  },
});

const translateISOToString = (ISO) => {
  if (ISO !== null) {
    const time = moment(ISO).subtract(1, "forever");
    const timeString = time.fromNow().split(" ");
    const ttl = timeString[timeString.length - 1];
    return ttl;
  }
};

const timeAgo = (time) => {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: (number) => number + "second ago",
      ss: "%d seconds ago",
      m: "1 minute ago",
      mm: "%d minutes ago",
      h: "1 hour ago",
      hh: "%d hours ago",
      d: "1 day ago",
      dd: "%ddays ago",
      M: "a month ago",
      MM: "%d months ago",
      y: "a year ago",
      yy: "%d years ago",
    },
  });

  let secondsElapsed = moment().diff(time, "seconds");
  let dayStart = moment().startOf("day").seconds(secondsElapsed);

  if (secondsElapsed > 300) {
    return moment(time).fromNow(true);
  } else if (secondsElapsed < 60) {
    return dayStart.format("s ") + "seconds ago";
  } else {
    const minute = dayStart.format("m ");
    const minuteString = minute > 1 ? " minutes ago" : " minute ago";
    return minute.concat(minuteString);
  }
};

export const translateISOTimeStamp = (ISO) => {
  return timeAgo(ISO);
};

export const translateISOTimeTitle = (ISO) => {
  return moment(ISO).format("YYYY-MM-DD HH:mm:ss");
};

export const tagToType = (tag) => {
  if (tag === "Other") {
    return "Others";
  } else {
    return tag;
  }
};

export const typeToTag = (type) => {
  if (type === "Others") {
    return "Other";
  } else {
    return type;
  }
};

export const postToFormData = (post) => ({
  title: post.title,
  description: post.content,
  tags: post.types.map((type) => typeToTag(type)),
  shareWith: `${post.visibility[0].toUpperCase()}${post.visibility.slice(1)}`,
  expires: `${
    post.expireAt !== null ? translateISOToString(post.expireAt) : forever
  }`,
  help: post.objective,
  author: post.author,
  language: post.language,
  likes: post.likes,
});

export const formDataToPost = (formData) => ({
  title: formData.title,
  content: formData.description,
  types: formData.tags.map((tag) => tagToType(tag)),
  visibility: formData.shareWith.toLowerCase(),
  expireAt: formData.expires.toLowerCase(),
  objective: formData.help,
  author: formData.author,
  language: formData.language,
  likes: formData.likes,
});

export const formDataToPostPatch = (formData) => ({
  title: formData.title,
  content: formData.description,
  types: formData.tags.map((tag) => tagToType(tag)),
  visibility: formData.shareWith.toLowerCase(),
  expireAt: formData.expires.toLowerCase(),
  objective: formData.help,
});
