class ForgotPassword {
  image = '.SocialImageSVG';
  forgotPasswordPageTitle = 'h4';
  emailField = '#email';
  submitButton = 'a[role=button]';
  backToSignInLink = 'a[href="/auth/login"]';
  errorMessageField = 'small';

  constructor() {}

  visit() {
    cy.visit('auth/forgot-password');
  }

  getForgotPasswordPageTitleLocator() {
    return this.forgotPasswordPageTitle;
  }

  getImageLocator() {
    return this.image;
  }

  getEmailField() {
    return cy.get(this.emailField);
  }

  getSubmitButton() {
    return cy.get(this.submitButton);
  }

  getBackToSignInLink() {
    return cy.get(this.backToSignInLink);
  }

  getErrorMessageField() {
    return cy.get(this.errorMessageField);
  }
}
export default ForgotPassword;
