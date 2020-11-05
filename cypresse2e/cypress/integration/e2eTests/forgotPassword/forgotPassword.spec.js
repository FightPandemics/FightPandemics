import ForgotPassword from "../../../elements/pages/forgotPassword";
import Logo from "../../../elements/pages/fpLogo";
import errorMessages from "../../../fixtures/errorMessages.json";
import emailAndPassword from "../../../fixtures/emailAndPassword.json";

describe("FightPandemics Forgot Password Page", () => {
  const forgotPassword = new ForgotPassword();
  const logo = new Logo();
  var h4Heading = "Forgot Password?";

  context("User is trying to recover forgotten password", () => {
    beforeEach(() => {
      forgotPassword.visit();
    });

    it("FP logo is visible and clickable", () => {
      cy.checkFpLogoIsVisibleAndClickable(logo.getFpLogoLocator());
    });

    it("Forgot Password page contains heading and image", () => {
      cy.pageContainsHeadingAndImage(
        forgotPassword.getForgotPasswordPageTitleLocator(),
        h4Heading,
        forgotPassword.getImageLocator(),
      );
    });

    it("Submit button is disabled", () => {
      checkSubmitButtonIsDisabled(forgotPassword.getSubmitButton());
    });

    it("Leaving email field blank triggers error and Submit Button is disabled", () => {
      emailField().focus().blur();
      var emailRequiredErrorMessage = forgotPassword.getErrorMessageField();
      emailRequiredErrorMessage.should("be.visible");
      emailRequiredErrorMessage.contains(errorMessages.requiredEmail);
      checkSubmitButtonIsDisabled(forgotPassword.getSubmitButton());
    });

    it("Entering invalid email triggers error and Submit Button is disabled", () => {
      emailField().type(emailAndPassword.invalidSampleEmail).focus().blur();
      var emailRequiredErrorMessage = forgotPassword.getErrorMessageField();
      emailRequiredErrorMessage.should("be.visible");
      emailRequiredErrorMessage.contains(errorMessages.invalidEmail);
      checkSubmitButtonIsDisabled(forgotPassword.getSubmitButton());
    });

    it("Entering correct email triggers Submit Button is enabled", () => {
      emailField().type(emailAndPassword.validSampleEmail).focus().blur();
      var submitButton = forgotPassword.getSubmitButton();
      submitButton.invoke("attr", "aria-disabled").should("contain", "false");
    });

    it("Back to Sign in screen link is visible and clickable", () => {
      var backToSignInPageLink = forgotPassword.getBackToSignInLink();
      backToSignInPageLink.should("be.visible");
      backToSignInPageLink.contains("Back to Sign In screen").click();
    });

    it('After entering correct email user clicks the Submit Button', () => {
      emailField().type(emailAndPassword.dummySampleEmail).focus().blur();
      var submitButton = forgotPassword.getSubmitButton();
      submitButton.click({force: true});
      cy.checkEmailIsOpen("/auth/check-email");
  });

  it('After entering correct email by Unregistered user clicks the Submit Button', () => {
    emailField().type(emailAndPassword.validSampleEmail).focus().blur();
    var submitButton = forgotPassword.getSubmitButton();
    submitButton.click({force: true});
    cy.checkEmailIsOpen("/auth/check-email");
});

  });

  function checkSubmitButtonIsDisabled(submitButton) {
    submitButton.invoke("attr", "aria-disabled").should("contain", "true");
  }

  function emailField() {
    var emailField = forgotPassword.getEmailField();
    emailField.should("be.visible").and("have.attr", "name", "email");
    return emailField;
  }
});
