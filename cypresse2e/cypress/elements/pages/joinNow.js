class JoinNow {

    fpLogo = '.am-navbar.am-navbar-light a img';
    h4Heading = 'h4';
    image = '.SocialImageSVG';
    emailField = '#email';
    passwordField = '#password';
    confirmPasswordField = '#confirmPassword';
    passwordEye = '#login-password div:nth-child(2) div img';
    confirmPasswordEye = '#login-password div:nth-child(3) div img';
    emailRequired = '#login-password div small';
    passwordRequired = '#login-password div small';
    confirmPasswordRequired = '#login-password div small';
    validEmailRequired = '#login-password div small';
    passwordLengthRequired = '#login-password div small';
    passwordCharacterRequired = '#login-password div small';
    confirmPasswordMatch = '#login-password div small';
    joinNowButton = '#SU_JN';
    signInLink = '#SU_SI';
    joinNowFbButton = '#SU_FB';
    joinNowGoogleButton = '#SU_GG';
    joinNowLinkedinButton = '#SU_LN';


    constructor() { }

    visit() {
        cy.visit('auth/signup');
    }

    getFpLogo() {
        return cy.get(this.fpLogo);
    }

    getH4Heading() {
        return cy.get(this.h4Heading);
    }

    getImage() {
        return cy.get(this.image);
    }

    getEmailField() {
        return cy.get(this.emailField);
    }

    getPasswordField() {
        return cy.get(this.passwordField);
    }

    getConfirmPasswordField() {
        return cy.get(this.confirmPasswordField);
    }

    getPasswordEye() {
        return cy.get(this.passwordEye);
    }

    getConfirmPasswordEye() {
        return cy.get(this.confirmPasswordEye);
    }

    getEmailRequired() {
        return cy.get(this.emailRequired);
    }

    getPasswordRequired() {
        return cy.get(this.passwordRequired);
    }

    getConfirmPasswordRequired() {
        return cy.get(this.confirmPasswordRequired);
    }

    getValidEmailRequired() {
        return cy.get(this.validEmailRequired);
    }

    getPasswordLengthRequired() {
        return cy.get(this.passwordLengthRequired);
    }

    getPasswordCharacterRequired() {
        return cy.get(this.passwordCharacterRequired);
    }

    getConfirmPasswordMatch() {
        return cy.get(this.confirmPasswordMatch);
    }

    getJoinNowButton() {
        return cy.get(this.joinNowButton);
    }

    getSignInLink() {
        return cy.get(this.signInLink);
    }

    getJoinNowFbButton() {
        return cy.get(this.joinNowFbButton);
    }

    getJoinNowGoogleButton() {
        return cy.get(this.joinNowGoogleButton);
    }

    getJoinNowLinkedinButton() {
        return cy.get(this.joinNowLinkedinButton);
    }

}
export default JoinNow;