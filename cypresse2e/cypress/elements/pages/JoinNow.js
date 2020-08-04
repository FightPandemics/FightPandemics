class JoinNow {

    h4Heading = "h4";
    image = ".SocialImageSVG";
    emailField = "#email";
    passwordField = "#password";
    confirmPasswordField = "#confirmPassword";
    joinNowButton = "#SU_JN";
    signInLink = "#SU_SI";
    joinNowFbButton = "#SU_FB";
    joinNowGoogleButton = "#SU_GG";
    joinNowLinkedinButton = "#SU_LN";


    constructor() { }

    visit() {
        cy.visit('');
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