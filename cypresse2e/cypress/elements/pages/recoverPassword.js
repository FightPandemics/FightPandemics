class RecoverPassword{

    fpLogo = '.am-navbar.am-navbar-light a img';
    image = '.SocialImageSVG';
    recoverPasswordPageTitle = "h4";
    emailField = '#email';
    recoverPasswordButton = 'a[role=button]';
    backToSignInLink = 'a[href="/auth/login"]';
    errorMessageField = 'small';

    constructor() { }

    visit() {
        cy.visit('auth/forgot-password');
    }

    getFpLogoLocator() {
        return this.fpLogo;
    }

    getRecoverPasswordPageTitleLocator() {
        return this.recoverPasswordPageTitle;
    }

    getImageLocator() {
        return this.image;
    }

    getEmailField() {
        return cy.get(this.emailField);
    }   

    getRecoverPasswordButton() {
        return cy.get(this.recoverPasswordButton);
    } 

    getBackToSignInLink() {
        return cy.get(this.backToSignInLink);
    } 

    getErrorMessageField() {
        return cy.get(this.errorMessageField);
    } 

}
export default RecoverPassword;