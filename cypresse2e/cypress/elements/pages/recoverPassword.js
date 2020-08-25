class RecoverPassword{

    fpLogo = '.am-navbar.am-navbar-light a img';
    image = '.SocialImageSVG';
    recoverPasswordPageTitle = "h4";
    emailField = '#email';
    recoveryPasswordButton = 'a[role=button]';
    backToSignInLink = 'a[href="/auth/login"]';
    errorMessageField = 'small';

    constructor() { }

    visit() {
        cy.visit('auth/forgot-password');
    }

    getFpLogo() {
        return cy.get(this.fpLogo);
    }

    getRecoverPasswordPageTitle() {
        return cy.get(this.recoverPasswordPageTitle);
    }

    getImage() {
        return cy.get(this.image);
    }

    getEmailField() {
        return cy.get(this.emailField);
    }   

    getRecoveryPasswordButton() {
        return cy.get(this.recoveryPasswordButton);
    } 

    getBackToSignInLink() {
        return cy.get(this.backToSignInLink);
    } 

    getErrorMessageField() {
        return cy.get(this.errorMessageField);
    } 

}
export default RecoverPassword;