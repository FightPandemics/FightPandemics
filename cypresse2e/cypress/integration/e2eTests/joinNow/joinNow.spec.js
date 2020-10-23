import JoinNow from '../../../elements/pages/joinNow';
import Logo from '../../../elements/pages/fpLogo';
import errorMessages from '../../../fixtures/errorMessages.json';
import emailAndPassword from '../../../fixtures/emailAndPassword.json';
import buttonNames from '../../../fixtures/buttonNames.json';

describe('FightPandemics Sign Up Page', () => {

	const joinNow = new JoinNow();
	const logo = new Logo();

	context('User signs up for an account', () => {
		beforeEach(() => {
			joinNow.visit();
		});

		it('FP logo is visible and clickable', () => {
			cy.checkFpLogoIsVisibleAndClickable(logo.getFpLogoLocator());
		});

		it('Sign up page contains heading and image', () => {
			var h4Heading = "Join Now";
			joinNow.getH4Heading().should('be.visible').contains(h4Heading);
			joinNow.getImage().should('be.visible');
		});

		it('Email address field is visible and can be populated', () => {
			emailField().type(emailAndPassword.dummySampleEmail);
		});

		it('Leaving email field blank triggers error', () => {
			emailField().focus().blur();
			var emailRequired = joinNow.getEmailRequired();
			emailRequired.should('be.visible');
			emailRequired.contains('small', errorMessages.requiredEmail);
		});

		it('Entering invalid email triggers error', () => {
			emailField().type(emailAndPassword.invalidSampleEmail).focus().blur();
			var validEmailRequired = joinNow.getValidEmailRequired();
			validEmailRequired.should('be.visible');
			validEmailRequired.contains('small', errorMessages.invalidEmail);
		});

		it('Password field is visible and can be populated', () => {
			passwordField().type(emailAndPassword.dummySamplePassword);
		});

		it('Clicking the password eye displays the password entered', () => {
			passwordField().type(emailAndPassword.dummySamplePassword);
			var passwordEye = joinNow.getPasswordEye();
			passwordEye.should('be.visible').and('have.attr', 'alt', 'Icon').click();
		});

		it('Leaving password field blank triggers error', () => {
			passwordField().focus().blur();
			var passwordRequired = joinNow.getPasswordRequired();
			passwordRequired.should('be.visible');
			passwordRequired.contains('small', errorMessages.passwordRequired);
		});

		it('Password entered not meeting 8 characters triggers error', () => {
			passwordField().type('test');
			var passwordLengthRequired = joinNow.getPasswordLengthRequired();
			passwordLengthRequired.should('be.visible');
			passwordLengthRequired.contains('small', errorMessages.passwordLengthRequired);
		});

		it('Password entered not meeting special characters triggers error', () => {
			passwordField().type('testtest');
			var passwordCharacterRequired = joinNow.getPasswordCharacterRequired();
			passwordCharacterRequired.should('be.visible');
			passwordCharacterRequired.contains('small', errorMessages.passwordCharacterRequired);
		});

		it('Confirm password field is visible and can be populated', () => {
			confirmPasswordField().type(emailAndPassword.dummySamplePassword);
		});

		it('Clicking the confirm password eye displays the confirm password entered', () => {
			confirmPasswordField().type(emailAndPassword.dummySamplePassword);
			var confirmPasswordEye = joinNow.getConfirmPasswordEye();
			confirmPasswordEye.should('be.visible').and('have.attr', 'alt', 'Icon').click();
		});

		it('Leaving confirm password field blank triggers error', () => {
			confirmPasswordField().focus().blur();
			var confirmPasswordRequired = joinNow.getConfirmPasswordRequired();
			confirmPasswordRequired.should('be.visible');
			confirmPasswordRequired.contains('small', errorMessages.passwordConfirmRequired);
		});

		it('Confirm password entered does not match original password entered triggers error', () => {
			passwordField().type(emailAndPassword.dummySamplePassword);
			confirmPasswordField().type('testing!');
			var confirmPasswordMatch = joinNow.getConfirmPasswordMatch();
			confirmPasswordMatch.should('be.visible');
			confirmPasswordMatch.contains('small', errorMessages.passwordNotMatched);
		});

		it('Join Now button is disabled when required details are not entered', () => {
			var joinNowButton = joinNow.getJoinNowButton();
			joinNowButton.should('be.visible').and('have.attr', 'aria-disabled', 'true');
		});

		it('Join Now button is enabled when required details are entered', () => {
			emailField().type(emailAndPassword.dummySampleEmail);
			passwordField().type(emailAndPassword.dummySamplePassword);
			confirmPasswordField().type(emailAndPassword.dummySamplePassword);
			var joinNowButton = joinNow.getJoinNowButton();
			joinNowButton.should('be.visible').and('have.attr', 'aria-disabled', 'false');
		});

		it('Sign in link is visible and clickable', () => {
			var signInLink = joinNow.getSignInLink();
			signInLink.should('be.visible');
			signInLink.contains('u', 'Sign In').click();
		});

		it('Facebook button for sign up is visible', () => {
			socialMediaSignUp(joinNow.getJoinNowFbButton(), buttonNames.facebook);
		});

		it('Google button for sign up is visible', () => {
			socialMediaSignUp(joinNow.getJoinNowGoogleButton(), buttonNames.google);
		});

		it('LinkedIn button for sign up is visible', () => {
			socialMediaSignUp(joinNow.getJoinNowLinkedinButton(), buttonNames.linkedIn);
		});

	});

	function emailField() {
		var emailField = joinNow.getEmailField();
		emailField.should('be.visible').and('have.attr', 'name', 'email');
		return emailField;
	}

	function passwordField() {
		var passwordField = joinNow.getPasswordField();
		passwordField.should('be.visible').and('have.attr', 'name', 'password');
		return passwordField;
	}

	function confirmPasswordField() {
		var confirmPasswordField = joinNow.getConfirmPasswordField();
		confirmPasswordField.should('be.visible').and('have.attr', 'name', 'confirmPassword');
		return confirmPasswordField;
	}

	function socialMediaSignUp(getMethod, socialMediaButton) {
		getMethod.should('be.visible')
			.contains('span', socialMediaButton);
	}

});