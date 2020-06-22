// 2nd non-httpOnly "dummy" cookie so user can logout offline
const REMEMBER_TOKEN_NAME = "remember";

export const clearRememberCookie = () => {
  const { location: { hostname }} = window;
  let clearRememberCookieString = `${REMEMBER_TOKEN_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;samesite=strict;`;
  if (hostname !== "localhost") {
    // need to include domain if not localhost
    clearRememberCookieString += `domain=${hostname.split(".").slice(-2).join(".")};`;
  }
  document.cookie = clearRememberCookieString;
}

export const checkRememberCookie = () => {
  return document.cookie.includes(REMEMBER_TOKEN_NAME);
}

