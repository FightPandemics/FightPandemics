import tlds from 'tlds';

const validateTopLevelDomain = (email) => {
    for (const tld of tlds) {
      if (email.endsWith('.' + tld)) {
        return true;
      }
    }
    return false;
};
export const validateEmail = (email) => {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailInput = String(email).toLowerCase();
  const isEmailValid = re.test(emailInput);

  return isEmailValid ? validateTopLevelDomain(emailInput) : false;
};
