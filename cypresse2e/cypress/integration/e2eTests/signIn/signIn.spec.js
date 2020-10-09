import SignIn from '../../../elements/pages/signIn';
import { DUMMY_SAMPLE_EMAIL } from '../../constants';
import {INVALID_EMAIL_ERROR_MESSAGE} from '../../constants';
import {REQUIRED_EMAIL_ERROR_MESSAGE} from '../../constants';

describe('FightPandemics Sign In Page', () => {

    const signIn = new SignIn();

    context('User signs into account', () => {
        beforeEach(() => {
            signIn.visit();
        });

        it('FP logo is visible and clickable', () => {
            var fpLogo = signIn.getFpLogo();
            cy.checkFpLogoIsVisibleAndClickable(signIn.getFpLogoLocator());

        });

        it('Sign in page contains heading and image', () => {
            var h4Heading = "Sign In";
            signIn.getH4Heading().should('be.visible').contains(h4Heading);

            signIn.getImage().should('be.visible');

        });

        it('Email address field is visible and can be populated', () => {
            var emailField = signIn.getEmailField();
            emailField.should('be.visible').and('have.attr', 'name', 'email');
            emailField.type(DUMMY_SAMPLE_EMAIL);

        });

        it('Leaving email field blank triggers error', () => {
            var emailField = signIn.getEmailField();
            emailField.should('be.visible').and('have.attr', 'name', 'email').focus().blur();
            var emailRequired = signIn.getEmailRequired();
            emailRequired.should('be.visible');
            emailRequired.contains(REQUIRED_EMAIL_ERROR_MESSAGE);

        });

        it('Entering invalid email triggers error', () => {
            var emailField = signIn.getEmailField();
            emailField.should('be.visible').and('have.attr', 'name', 'email');
            emailField.type('qa.test@').focus().blur();
            var validEmailRequired = signIn.getValidEmailRequired();
            validEmailRequired.should('be.visible');
            validEmailRequired.contains(INVALID_EMAIL_ERROR_MESSAGE);

        });

        it('Password field is visible and can be populated', () => {
            var passwordField = signIn.getPasswordField();
            passwordField.should('be.visible').and('have.attr', 'name', 'password');
            passwordField.type('Testing!');

        });

        it('Clicking the password eye displays the password entered', () => {
            var passwordField = signIn.getPasswordField();
            passwordField.should('be.visible').and('have.attr', 'name', 'password');
            passwordField.type('Testing!');
            var passwordEye = signIn.getPasswordEye();
            passwordEye.should('be.visible').and('have.attr', 'alt', 'Icon').click();
        });

        it('Leaving password field blank triggers error', () => {
            var passwordField = signIn.getPasswordField();
            passwordField.should('be.visible').and('have.attr', 'name', 'password').focus().blur();
            var passwordRequired = signIn.getPasswordRequired();
            passwordRequired.should('be.visible');
            passwordRequired.contains('Password is required.');

        });

        it('Password entered not meeting 8 characters triggers error', () => {
            var passwordField = signIn.getPasswordField();
            passwordField.should('be.visible');
            passwordField.type('test');
            var passwordLengthRequired = signIn.getPasswordLengthRequired();
            passwordLengthRequired.should('be.visible');
            passwordLengthRequired.contains('Password must be at least 8 characters');

        });

        it('Password entered not meeting special characters triggers error', () => {
            var passwordField = signIn.getPasswordField();
            passwordField.should('be.visible');
            passwordField.type('testtest');
            var passwordCharacterRequired = signIn.getPasswordCharacterRequired();
            passwordCharacterRequired.should('be.visible');
            passwordCharacterRequired.contains('Password must contain at least 3 of these: lower-case letter, an upper-case letter, a number, a special character (such as !@#$%^&*).');

        });

        it('Sign in button is disabled when required details are not entered', () => {
            var signInButton = signIn.getSignInButton();
            signInButton.should('be.visible').and('have.attr', 'aria-disabled', 'true');

        });

        it('Sign in button is enabled when required details are entered', () => {
            signIn.getEmailField().type(DUMMY_SAMPLE_EMAIL);
            signIn.getPasswordField().type('Testing!');
            var signInButton = signIn.getSignInButton();
            signInButton.should('be.visible').and('have.attr', 'aria-disabled', 'false');

        });


        it('Login fail alert appears when incorrect email & password are entered and submitted by user', () => {
            cy.generateRandomEmail().then((email) => {
                signIn.getEmailField().type(email);
            });
            signIn.getPasswordField().type('WrongPW!wpw3hi');
            signIn.getSignInButton().click();
            var loginFailAlert = signIn.getLoginFailAlert();
            loginFailAlert.should('be.visible');
            loginFailAlert.contains('Login failed, reason: Wrong email or password');
        });

        it('Login fail alert appears when maximum sign in attempts are exceeded', () => {
            signIn.getEmailField().type(DUMMY_SAMPLE_EMAIL);
            signIn.getPasswordField().type('WrongPW!wpw3hi');
            for (var i = 0; i < 11; i++) {
                signIn.getSignInButton().click();
            };
            var loginFailAlert = signIn.getLoginFailAlert();
            loginFailAlert.should('be.visible');
            loginFailAlert.contains('Login failed, reason: Maximum number of sign in attempts exceeded.');

        });

        it('Forgot password link is visible and clickable', () => {
            var forgotPasswordLink = signIn.getForgotPasswordLink();
            forgotPasswordLink.should('be.visible');
            forgotPasswordLink.contains('a', 'Forgot password?').click();

        });

        it('Join now link is visible and clickable', () => {
            var joinNowLink = signIn.getJoinNowLink();
            joinNowLink.should('be.visible');
            joinNowLink.contains('u', 'Join Now').click();

        });

        it('Facebook button for sign in is visible', () => {
            var signInByFbButton = signIn.getSignInFbButton();
            signInByFbButton.should('be.visible');
            signInByFbButton.contains('span', 'Facebook');

        });

        it('Google button for sign in is visible', () => {
            var signInByGoogleButton = signIn.getSignInGoogleButton();
            signInByGoogleButton.should('be.visible');
            signInByGoogleButton.contains('span', 'Google');

        });

        it('LinkedIn button for sign in is visible', () => {
            var signInByLinkedinButton = signIn.getSignInLinkedinButton();
            signInByLinkedinButton.should('be.visible');
            signInByLinkedinButton.contains('span', 'LinkedIn');

        });
    });
});