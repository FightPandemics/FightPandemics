import SignIn from '../../../elements/pages/signIn';
import Logo from '../../../elements/pages/fpLogo';
import errorMessages from '../../../fixtures/errorMessages.json';
import buttonNames from '../../../fixtures/buttonNames.json';
import emailAndPassword from '../../../fixtures/emailAndPassword.json';

describe('FightPandemics Sign In Page', () => {
  const signIn = new SignIn();
  const logo = new Logo();
  var h4Heading = 'Sign In';

  context('User signs into account', () => {
    beforeEach(() => {
      signIn.visit();
    });

    it('FP logo is visible and clickable', () => {
      cy.checkFpLogoIsVisibleAndClickable(logo.getFpLogoLocator());
    });

    it('Sign in page contains heading and image', () => {
      cy.pageContainsHeadingAndImage(
        signIn.getH4Heading(),
        h4Heading,
        signIn.getImage(),
      );
    });

    it('Email address field is visible and can be populated', () => {
      emailField().type(emailAndPassword.dummySampleEmail);
    });

    it('Leaving email field blank triggers error', () => {
      emailField().focus().blur();
      var emailRequired = signIn.getEmailRequired();
      emailRequired.should('be.visible');
      emailRequired.contains(errorMessages.requiredEmail);
    });

    it('Entering invalid email triggers error', () => {
      emailField().type(emailAndPassword.invalidSampleEmail).focus().blur();
      var validEmailRequired = signIn.getValidEmailRequired();
      validEmailRequired.should('be.visible');
      validEmailRequired.contains(errorMessages.invalidEmail);
    });

    it('Password field is visible and can be populated', () => {
      passwordField().type(emailAndPassword.dummySamplePassword);
    });

    it('Clicking the password eye displays the password entered', () => {
      passwordField().type(emailAndPassword.dummySamplePassword);
      var passwordEye = signIn.getPasswordEye();
      passwordEye.should('be.visible').and('have.attr', 'alt', 'Icon').click();
    });

    it('Leaving password field blank triggers error', () => {
      passwordField().focus().blur();
      var passwordRequired = signIn.getPasswordRequired();
      passwordRequired.should('be.visible');
      passwordRequired.contains(errorMessages.passwordRequired);
    });

    it('Password entered not meeting 8 characters triggers error', () => {
      passwordField().type('test');
      var passwordLengthRequired = signIn.getPasswordLengthRequired();
      passwordLengthRequired.should('be.visible');
      passwordLengthRequired.contains(errorMessages.passwordLengthRequired);
    });

    it('Password entered not meeting special characters triggers error', () => {
      passwordField().type('testtest');
      var passwordCharacterRequired = signIn.getPasswordCharacterRequired();
      passwordCharacterRequired.should('be.visible');
      passwordCharacterRequired.contains(
        errorMessages.passwordCharacterRequired,
      );
    });

    it('Sign in button is disabled when required details are not entered', () => {
      var signInButton = signIn.getSignInButton();
      signInButton
        .should('be.visible')
        .and('have.attr', 'aria-disabled', 'true');
    });

    it('Sign in button is enabled when required details are entered', () => {
      signIn.getEmailField().type(emailAndPassword.dummySampleEmail);
      signIn.getPasswordField().type(emailAndPassword.dummySamplePassword);
      var signInButton = signIn.getSignInButton();
      signInButton
        .should('be.visible')
        .and('have.attr', 'aria-disabled', 'false');
    });

    it('Login fail alert appears when incorrect email & password are entered and submitted by user', () => {
      cy.generateRandomEmail(8, 8).then((email) => {
        signIn.getEmailField().type(email);
      });
      signIn.getPasswordField().type(emailAndPassword.dummySamplePassword);
      signIn.getSignInButton().click();
      var loginFailAlert = signIn.getLoginFailAlert();
      loginFailAlert.should('be.visible');
      loginFailAlert.contains(errorMessages.loginFailWrongEmail);
    });

    it('Login fail alert appears when maximum sign in attempts are exceeded', () => {
      signIn.getEmailField().type(emailAndPassword.dummySampleEmail);
      signIn.getPasswordField().type(emailAndPassword.dummySamplePassword);
      for (var i = 0; i < 11; i++) {
        signIn.getSignInButton().click();
      }
      var loginFailAlert = signIn.getLoginFailAlert();
      loginFailAlert.should('be.visible');
      loginFailAlert.contains(errorMessages.loginFailMaximumAttempts);
    });

    it('Forgot password link is visible and clickable', () => {
      var forgotPasswordLink = signIn.getForgotPasswordLink();
      forgotPasswordLink.should('be.visible');
      forgotPasswordLink.contains('a', 'Forgot Password?').click();
    });

    it('Join now link is visible and clickable', () => {
      var joinNowLink = signIn.getJoinNowLink();
      joinNowLink.should('be.visible');
      joinNowLink.contains('u', buttonNames.joinNow).click();
    });

    it('Facebook button for sign in is visible', () => {
      socialMediaSignIn(signIn.getSignInFbButton(), buttonNames.facebook);
    });

    it('Google button for sign in is visible', () => {
      socialMediaSignIn(signIn.getSignInGoogleButton(), buttonNames.google);
    });

    it('LinkedIn button for sign in is visible', () => {
      socialMediaSignIn(signIn.getSignInLinkedinButton(), buttonNames.linkedIn);
    });
  });

  function emailField() {
    var emailField = signIn.getEmailField();
    emailField.should('be.visible').and('have.attr', 'name', 'email');
    return emailField;
  }

  function passwordField() {
    var passwordField = signIn.getPasswordField();
    passwordField.should('be.visible').and('have.attr', 'name', 'password');
    return passwordField;
  }

  function socialMediaSignIn(getMethod, socialMediaButton) {
    getMethod.should('be.visible').contains('span', socialMediaButton);
  }
});
