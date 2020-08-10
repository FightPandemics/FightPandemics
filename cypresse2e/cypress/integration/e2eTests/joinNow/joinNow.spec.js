import JoinNow from '../../../elements/pages/JoinNow';

describe('FightPandemics Sign Up Page', () => {

  const joinNow = new JoinNow();

  context('User signs up for an account', () => {
    beforeEach(() => {
      joinNow.visit();
    });

    it('Sign up page contains heading and image', () => {
      joinNow.getH4Heading().should('be.visible').contains('Join Now');
      joinNow.getImage().should('be.visible');

    });

    it('Email address field is visible and can be populated', () => {
      joinNow.getEmailField().should('be.visible').and('have.attr', 'name', 'email');

    });

    it('Password field is visible and can be populated', () => {
      joinNow.getPasswordField().should('be.visible').and('have.attr', 'name', 'password');

    });

    it('Confirm password field is visible and can be populated', () => {
      joinNow.getConfirmPasswordField().should('be.visible').and('have.attr', 'name', 'confirmPassword');

    });

    it('Join Now button is visible and clickable', () => {
      joinNow.getJoinNowButton().should('be.visible').contains('span', 'Join Now');

    });

    it('Sign in link is visible and clickable', () => {
      joinNow.getSignInLink().should('be.visible').contains('u', 'Sign In').click();

    });

    it('Social Media buttons for sign up are visible and clickable', () => {
      joinNow.getJoinNowFbButton().should('be.visible').contains('span', 'Facebook').click();
      joinNow.getJoinNowGoogleButton().should('be.visible').contains('span', 'Google').click();
      joinNow.getJoinNowLinkedinButton().should('be.visible').contains('span', 'Linkedin').click();

    });

  });
})