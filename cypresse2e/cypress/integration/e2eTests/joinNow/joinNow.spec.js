import JoinNow from '../../../elements/pages/joinNow';

describe('FightPandemics Sign Up Page', () => {

  const joinNow = new JoinNow();

  context('User signs up for an account', () => {
    beforeEach(() => {
      joinNow.visit();
    });

    it('FP logo is visible and clickable', () => {
      var fpLogo = joinNow.getFpLogo();
      fpLogo.should('be.visible').and('have.attr', 'alt', 'Fight Pandemics logo').click();

    });

    it('Sign up page contains heading and image', () => {
      var h4Heading = "Join Now";
      joinNow.getH4Heading().should('be.visible').contains(h4Heading);

      joinNow.getImage().should('be.visible');

    });

    it('Email address field is visible and can be populated', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email');
      emailField.type('qa.test@gmail.com');

    });

    it('Leaving email field blank triggers error', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email').focus().blur();
      var emailRequired = joinNow.getEmailRequired();
      emailRequired.should('be.visible');
      emailRequired.contains('small', 'Email is required.');

    });

    it('Entering invalid email triggers error', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email');
      emailField.type('qa.test@').focus().blur();
      var validEmailRequired = joinNow.getValidEmailRequired();
      validEmailRequired.should('be.visible');
      validEmailRequired.contains('small', 'Invalid email');

    });

    it('Password field is visible and can be populated', () => {
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible').and('have.attr', 'name', 'password');
      passwordField.type('Testing!');

    });

    it('Clicking the password eye displays the password entered', () => {
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible').and('have.attr', 'name', 'password');
      passwordField.type('Testing!');
      var passwordEye = joinNow.getPasswordEye();
      passwordEye.should('be.visible').and('have.attr', 'alt', 'Icon').click();

    });

    it('Leaving password field blank triggers error', () => {
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible').and('have.attr', 'name', 'password').focus().blur();
      var passwordRequired = joinNow.getPasswordRequired();
      passwordRequired.should('be.visible');
      passwordRequired.contains('small', 'Password is required.');

    });

    it('Password entered not meeting 8 characters triggers error', () => {
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible');
      passwordField.type('test');
      var passwordLengthRequired = joinNow.getPasswordLengthRequired();
      passwordLengthRequired.should('be.visible');
      passwordLengthRequired.contains('small', 'Password must be at least 8 characters');

    });

    it('Password entered not meeting special characters triggers error', () => {
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible');
      passwordField.type('testtest');
      var passwordCharacterRequired = joinNow.getPasswordCharacterRequired();
      passwordCharacterRequired.should('be.visible');
      passwordCharacterRequired.contains('small', 'Password must contain at least 3 of these: a lower-case letter, an upper-case letter, a number, a special character (such as !@#$%^&*).');

    });

    it('Confirm password field is visible and can be populated', () => {
      var confirmPasswordField = joinNow.getConfirmPasswordField();
      confirmPasswordField.should('be.visible').and('have.attr', 'name', 'confirmPassword');
      confirmPasswordField.type('Testing!');

    });

    it('Clicking the confirm password eye displays the confirm password entered', () => {
      var confirmPasswordField = joinNow.getConfirmPasswordField();
      confirmPasswordField.should('be.visible').and('have.attr', 'name', 'confirmPassword');
      confirmPasswordField.type('Testing!');
      var confirmPasswordEye = joinNow.getConfirmPasswordEye();
      confirmPasswordEye.should('be.visible').and('have.attr', 'alt', 'Icon').click();

    });

    it('Leaving confirm password field blank triggers error', () => {
      var confirmPasswordField = joinNow.getConfirmPasswordField();
      confirmPasswordField.should('be.visible').and('have.attr', 'name', 'confirmPassword').focus().blur();
      var confirmPasswordRequired = joinNow.getConfirmPasswordRequired();
      confirmPasswordRequired.should('be.visible');
      confirmPasswordRequired.contains('small', 'Password confirmation is required.');

    });

    it('Confirm password entered does not match original password entered triggers error', () => {
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible');
      passwordField.type('Testing!');
      var confirmPasswordField = joinNow.getConfirmPasswordField();
      confirmPasswordField.should('be.visible');
      confirmPasswordField.type('testing!');
      var confirmPasswordMatch = joinNow.getConfirmPasswordMatch();
      confirmPasswordMatch.should('be.visible');
      confirmPasswordMatch.contains('small', `Passwords don't match`);

    });

    it('Join Now button is disabled when required details are not entered', () => {
      var joinNowButton = joinNow.getJoinNowButton();
      joinNowButton.should('be.visible').and('have.attr', 'aria-disabled', 'true');

    });

    it('Join Now button is enabled when required details are entered', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email');
      emailField.type('qa.test@gmail.com');
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible').and('have.attr', 'name', 'password');
      passwordField.type('Testing!');
      var confirmPasswordField = joinNow.getConfirmPasswordField();
      confirmPasswordField.should('be.visible').and('have.attr', 'name', 'confirmPassword');
      confirmPasswordField.type('Testing!');
      var joinNowButton = joinNow.getJoinNowButton();
      joinNowButton.should('be.visible').and('have.attr', 'aria-disabled', 'false');

    });

    it('Sign in link is visible and clickable', () => {
      var signInLink = joinNow.getSignInLink();
      signInLink.should('be.visible');
      signInLink.contains('u', 'Sign In').click();

    });

    it('Facebook button for sign up is visible', () => {
      var joinByFbButton = joinNow.getJoinNowFbButton();
      joinByFbButton.should('be.visible')
      joinByFbButton.contains('span', 'Facebook');

    });

    it('Google button for sign up is visible', () => {
      var joinByGoogleButton = joinNow.getJoinNowGoogleButton();
      joinByGoogleButton.should('be.visible');
      joinByGoogleButton.contains('span', 'Google');

    });


    it('LinkedIn button for sign up is visible', () => {
      var joinByLinkedinButton = joinNow.getJoinNowLinkedinButton();
      joinByLinkedinButton.should('be.visible');
      joinByLinkedinButton.contains('span', 'Linkedin');

    });
  });
})