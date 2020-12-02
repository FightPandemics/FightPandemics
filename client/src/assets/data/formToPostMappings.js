import moment from "moment";
import createPostSettings from "assets/data/createPostSettings";
import filterOptions from "assets/data/filterOptions";

const { type: typeFilter } = filterOptions;
const { expires } = createPostSettings;

const day = expires.options[0].value;
const week = expires.options[1].value;
const month = expires.options[2].value;
const forever = expires.options[3].value;

const translateISOToString = (ISO) => {
  if (ISO !== null) {
    const timeDiffMilliSeconds = moment(ISO).diff(moment());
    const timeDiffHours = timeDiffMilliSeconds / 1000 / 3600;
    // because we have only 4 options - day, week, month, forever
    // add enough slack time to make sure different zones/locales all get stable predicts
    // console.log(timeDiffHours / 24); // see days differences
    if (timeDiffHours < 24 * 3) return day; // < 3 days, create as day
    if (timeDiffHours < 24 * 10) return week; // < 10 days, create as week
    if (timeDiffHours < 24 * 40) return month; // < 40 days, create as month
    return forever;
  }
};

export const translateISOTimeTitle = (ISO) => {
  return moment(ISO).format("YYYY-MM-DD HH:mm");
};

const getTextFromOption = (type) =>
  typeFilter.options.filter(({ value }) => value === type)[0].text;

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
