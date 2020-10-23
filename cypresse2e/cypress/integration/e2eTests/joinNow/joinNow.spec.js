import JoinNow from '../../../elements/pages/joinNow';
import errorMessages from '../../../fixtures/errorMessages.json';
import emailAndPassword from '../../../fixtures/emailAndPassword.json';
import buttonNames from '../../../fixtures/buttonNames.json';

describe('FightPandemics Sign Up Page', () => {

  const joinNow = new JoinNow();

  context('User signs up for an account', () => {
    beforeEach(() => {
      joinNow.visit();
    });

    it('FP logo is visible and clickable', () => {
      cy.checkFpLogoIsVisibleAndClickable(joinNow.getFpLogoLocator());
    });

    it('Sign up page contains heading and image', () => {
      var h4Heading = "Join Now";
      joinNow.getH4Heading().should('be.visible').contains(h4Heading);
      joinNow.getImage().should('be.visible');
    });

    it('Email address field is visible and can be populated', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email');
      emailField.type(emailAndPassword.dummySampleEmail);
    });

    it('Leaving email field blank triggers error', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email').focus().blur();
      var emailRequired = joinNow.getEmailRequired();
      emailRequired.should('be.visible');
      emailRequired.contains('small', errorMessages.requiredEmail);
    });

    it('Entering invalid email triggers error', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email');
      emailField.type(emailAndPassword.invalidSampleEmail).focus().blur();
      var validEmailRequired = joinNow.getValidEmailRequired();
      validEmailRequired.should('be.visible');
      validEmailRequired.contains('small', errorMessages.invalidEmail);
    });

    it('Entering @ twice or more in email triggers error', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email');
      emailField.type(emailAndPassword.invalidSampleEmail2).focus().blur();
      var validEmailRequired = joinNow.getValidEmailRequired();
      validEmailRequired.should('be.visible');
      validEmailRequired.contains('small', errorMessages.invalidEmail);
    });
    
    it('Entering .tld which are not in txt triggers error', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email');
      emailField.type(emailAndPassword.invalidSampleEmailXY).focus().blur();
      var validEmailRequired = joinNow.getValidEmailRequired();
      validEmailRequired.should('be.visible');
      validEmailRequired.contains('small', errorMessages.invalidEmail);
    });

    it('Entering .tld which are in txt can be populated', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email');
      emailField.type(emailAndPassword.validEmailWithTld);
    });

    it('Entering more than 64 characters in email body triggers error', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email');
      emailField.type(emailAndPassword.invalidSampleEmail65).focus().blur();
      var validEmailRequired = joinNow.getValidEmailRequired();
      validEmailRequired.should('be.visible');
      validEmailRequired.contains('small', errorMessages.invalidEmail);
    });

    it('Entering more than 63 characters in domain field after @ triggers error', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email');
      emailField.type(emailAndPassword.invalidDomainForEmail).focus().blur();
      var validEmailRequired = joinNow.getValidEmailRequired();
      validEmailRequired.should('be.visible');
      validEmailRequired.contains('small', errorMessages.invalidEmail);
    });

    it('Password field is visible and can be populated', () => {
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible').and('have.attr', 'name', 'password');
      passwordField.type(emailAndPassword.dummySamplePassword);
    });

    it('Clicking the password eye displays the password entered', () => {
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible').and('have.attr', 'name', 'password');
      passwordField.type(emailAndPassword.dummySamplePassword);
      var passwordEye = joinNow.getPasswordEye();
      passwordEye.should('be.visible').and('have.attr', 'alt', 'Icon').click();
    });

    it('Leaving password field blank triggers error', () => {
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible').and('have.attr', 'name', 'password').focus().blur();
      var passwordRequired = joinNow.getPasswordRequired();
      passwordRequired.should('be.visible');
      passwordRequired.contains('small', errorMessages.passwordRequired);
    });

    it('Password entered not meeting 8 characters triggers error', () => {
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible');
      passwordField.type('test');
      var passwordLengthRequired = joinNow.getPasswordLengthRequired();
      passwordLengthRequired.should('be.visible');
      passwordLengthRequired.contains('small', errorMessages.passwordLengthRequired);
    });

    it('Password entered not meeting special characters triggers error', () => {
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible');
      passwordField.type('testtest');
      var passwordCharacterRequired = joinNow.getPasswordCharacterRequired();
      passwordCharacterRequired.should('be.visible');
      passwordCharacterRequired.contains('small', errorMessages.passwordCharacterRequired);
    });

    it('Confirm password field is visible and can be populated', () => {
      var confirmPasswordField = joinNow.getConfirmPasswordField();
      confirmPasswordField.should('be.visible').and('have.attr', 'name', 'confirmPassword');
      confirmPasswordField.type(emailAndPassword.dummySamplePassword);
    });

    it('Clicking the confirm password eye displays the confirm password entered', () => {
      var confirmPasswordField = joinNow.getConfirmPasswordField();
      confirmPasswordField.should('be.visible').and('have.attr', 'name', 'confirmPassword');
      confirmPasswordField.type(emailAndPassword.dummySamplePassword);
      var confirmPasswordEye = joinNow.getConfirmPasswordEye();
      confirmPasswordEye.should('be.visible').and('have.attr', 'alt', 'Icon').click();
    });

    it('Leaving confirm password field blank triggers error', () => {
      var confirmPasswordField = joinNow.getConfirmPasswordField();
      confirmPasswordField.should('be.visible').and('have.attr', 'name', 'confirmPassword').focus().blur();
      var confirmPasswordRequired = joinNow.getConfirmPasswordRequired();
      confirmPasswordRequired.should('be.visible');
      confirmPasswordRequired.contains('small', errorMessages.passwordConfirmRequired);
    });

    it('Confirm password entered does not match original password entered triggers error', () => {
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible');
      passwordField.type(emailAndPassword.dummySamplePassword);
      var confirmPasswordField = joinNow.getConfirmPasswordField();
      confirmPasswordField.should('be.visible');
      confirmPasswordField.type('testing!');
      var confirmPasswordMatch = joinNow.getConfirmPasswordMatch();
      confirmPasswordMatch.should('be.visible');
      confirmPasswordMatch.contains('small', errorMessages.passwordNotMatched);
    });

    it('Join Now button is disabled when required details are not entered', () => {
      var joinNowButton = joinNow.getJoinNowButton();
      joinNowButton.should('be.visible').and('have.attr', 'aria-disabled', 'true');
    });
  

    it('Join Now button is enabled when required details are entered', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email');
      emailField.type(emailAndPassword.dummySampleEmail);
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible').and('have.attr', 'name', 'password');
      passwordField.type(emailAndPassword.dummySamplePassword);
      var confirmPasswordField = joinNow.getConfirmPasswordField();
      confirmPasswordField.should('be.visible').and('have.attr', 'name', 'confirmPassword');
      confirmPasswordField.type(emailAndPassword.dummySamplePassword);
      var joinNowButton = joinNow.getJoinNowButton();
      joinNowButton.should('be.visible').and('have.attr', 'aria-disabled', 'false');
    });

    it('After giving correct email and password user clicking Join Now  Button', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email');
      cy.generateRandomEmail().then((email) => {
        joinNow.getEmailField().type(email);
    });
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible').and('have.attr', 'name', 'password');
      passwordField.type(emailAndPassword.dummySamplePassword);
      var confirmPasswordField = joinNow.getConfirmPasswordField();
      confirmPasswordField.should('be.visible').and('have.attr', 'name', 'confirmPassword');
      confirmPasswordField.type(emailAndPassword.dummySamplePassword);
      var joinNowButton = joinNow.getJoinNowButton();
      joinNowButton.click({force: true});
      cy.checkEmailIsOpen("/auth/check-email");
  });

    it('Sign in link is visible and clickable', () => {
      var signInLink = joinNow.getSignInLink();
      signInLink.should('be.visible');
      signInLink.contains('u', 'Sign In').click();
    });

    it('Facebook button for sign up is visible', () => {
      var joinByFbButton = joinNow.getJoinNowFbButton();
      joinByFbButton.should('be.visible');
      joinByFbButton.contains('span', buttonNames.facebook);
    });

    it('Google button for sign up is visible', () => {
      var joinByGoogleButton = joinNow.getJoinNowGoogleButton();
      joinByGoogleButton.should('be.visible');
      joinByGoogleButton.contains('span', buttonNames.google);
    });

    it('LinkedIn button for sign up is visible', () => {
      var joinByLinkedinButton = joinNow.getJoinNowLinkedinButton();
      joinByLinkedinButton.should('be.visible');
      joinByLinkedinButton.contains('span', buttonNames.linkedIn);
    });

  });

});