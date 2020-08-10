import JoinNow from '../../../elements/pages/JoinNow';

describe('FightPandemics Sign Up Page', () => {

  const joinNow = new JoinNow();

  context('User signs up for an account', () => {
    beforeEach(() => {
      joinNow.visit();
    });

    it('Sign up page contains heading and image', () => {
      var h4Heading = "Join Now";
      joinNow.getH4Heading().should('be.visible').contains(h4Heading);

      joinNow.getImage().should('be.visible');

    });

    it('Email address field is visible and can be populated', () => {
      var emailField = joinNow.getEmailField();
      emailField.should('be.visible').and('have.attr', 'name', 'email');

    });

    it('Password field is visible and can be populated', () => {
      var passwordField = joinNow.getPasswordField();
      passwordField.should('be.visible').and('have.attr', 'name', 'password');

    });

    it('Confirm password field is visible and can be populated', () => {
      var confirmPasswordField = joinNow.getConfirmPasswordField();
      confirmPasswordField.should('be.visible').and('have.attr', 'name', 'confirmPassword');

    });

    it('Join Now button is visible and clickable', () => {
      var joinNowButton = joinNow.getJoinNowButton();
      joinNowButton.should('be.visible');
      joinNowButton.contains('span', 'Join Now');

    });

    it('Sign in link is visible and clickable', () => {
      var signInLink = joinNow.getSignInLink();
      signInLink.should('be.visible');
      signInLink.contains('u', 'Sign In').click();

    });

    it('Social Media buttons for sign up are visible and clickable', () => {
      var joinByFbButton = joinNow.getJoinNowFbButton();
      joinByFbButton.should('be.visible')
      joinByFbButton.contains('span', 'Facebook');

      var joinByGoogleButton = joinNow.getJoinNowGoogleButton();
      joinByGoogleButton.should('be.visible');
      joinByGoogleButton.contains('span', 'Google');

      var joinByLinkedinButton = joinNow.getJoinNowLinkedinButton();
      joinByLinkedinButton.should('be.visible');
      joinByLinkedinButton.contains('span', 'Linkedin');

    });
  });
})