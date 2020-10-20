class SignIn {

    fpLogo = '.am-navbar.am-navbar-light a img';
    h4Heading = 'h4';
    image = '.SocialImageSVG';
    emailField = '#email';
    passwordField = '#password';
    passwordEye = '#login-password div:nth-child(2) div img';
    emailRequired = '#login-password div small';
    passwordRequired = '#login-password div small';
    validEmailRequired = '#login-password div small';
    passwordLengthRequired = '#login-password div small';
    passwordCharacterRequired = '#login-password div small';
    signInButton = '#SI_SI';
    loginFailAlert = '.ant-alert-message';
    forgotPasswordLink = '.form-container .text-center p:nth-child(1)';
    joinNowLink = '#SI_JN';
    signInFbButton = '#SI_FB';
    signInGoogleButton = '#SI_GG';
    signInLinkedinButton = '#SI_LN';


    constructor() { }

    visit() {
        cy.visit('auth/login');
    }

    getFpLogo() {
        return cy.get(this.fpLogo);
    }

    getFpLogoLocator() {
        return this.fpLogo;
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

    getPasswordEye() {
        return cy.get(this.passwordEye);
    }

    getEmailRequired() {
        return cy.get(this.emailRequired);
    }

    getPasswordRequired() {
        return cy.get(this.passwordRequired);
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

    getSignInButton() {
        return cy.get(this.signInButton);
    }

    getLoginFailAlert() {
        return cy.get(this.loginFailAlert);
    }

    getForgotPasswordLink() {
        return cy.get(this.forgotPasswordLink);
    }

    getJoinNowLink() {
        return cy.get(this.joinNowLink);
    }

    getSignInFbButton() {
        return cy.get(this.signInFbButton);
    }

    getSignInGoogleButton() {
        return cy.get(this.signInGoogleButton);
    }

    getSignInLinkedinButton() {
        return cy.get(this.signInLinkedinButton);
    }

}
export default SignIn;