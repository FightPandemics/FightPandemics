import RecoverPassword from '../../../elements/pages/recoverPassword'
import {VALID_SAMPLE_EMAIL} from '../../constants';
import {INVALID_EMAIL_ERROR_MESSAGE} from '../../constants';
import {REQUIRED_EMAIL_ERROR_MESSAGE} from '../../constants';


describe('FightPandemics Recover Password Page', () => {

    const recoverPassword = new RecoverPassword();
    var h4Heading = "Recover Password";


    context('User is trying to recover password', () => {
        beforeEach(() => {
            recoverPassword.visit();
        });

        it('FP logo is visible and clickable', () => {
            cy.checkFpLogoIsVisibleAndClickable(recoverPassword.getFpLogoLocator());

        });
        
        it('Recover Password page contains heading and image', () => {          
            cy.pageContainsHeadingAndImage(recoverPassword.getRecoverPasswordPageTitleLocator(),h4Heading, recoverPassword.getImageLocator());
        });

        it('Recover Password button is disabled', () => {
            checkRecoverButtonIsDisabled(recoverPassword.getRecoverPasswordButton());
        });

        it('Leaving email field blank triggers error and Recover Password Button is disabled', () => {
            var emailField = recoverPassword.getEmailField();
            emailField.should('be.visible').and('have.attr', 'name', 'email').focus().blur();
            var emailRequiredErrorMessage = recoverPassword.getErrorMessageField();
            emailRequiredErrorMessage.should('be.visible');
            emailRequiredErrorMessage.contains(REQUIRED_EMAIL_ERROR_MESSAGE);
            checkRecoverButtonIsDisabled(recoverPassword.getRecoverPasswordButton());

        });

        it('Entering invalid email triggers error and Recover Password Button is disabled', () => {
            var emailField = recoverPassword.getEmailField();
            emailField.should('be.visible').and('have.attr', 'name', 'email');
            emailField.type('qa.test.invalid@').focus().blur();
            var emailRequiredErrorMessage = recoverPassword.getErrorMessageField();
            emailRequiredErrorMessage.should('be.visible');
            emailRequiredErrorMessage.contains(INVALID_EMAIL_ERROR_MESSAGE);
            checkRecoverButtonIsDisabled(recoverPassword.getRecoverPasswordButton());

        });
        
        it('Entering correct email triggers Recovery Button is enabled', () => {
            var emailField = recoverPassword.getEmailField();
            emailField.should('be.visible').and('have.attr', 'name', 'email');
            emailField.type(VALID_SAMPLE_EMAIL).focus().blur();           
            var recoverPasswordButton = recoverPassword.getRecoverPasswordButton();
            recoverPasswordButton.invoke('attr', 'aria-disabled').should('contain', 'false');
        });

        it('Back to Sign in screen link is visible and clickable', () => {
            var backToSignInPageLink = recoverPassword.getBackToSignInLink();
            backToSignInPageLink.should('be.visible');
            backToSignInPageLink.contains('Back to Sign In screen').click();

        });
    });

    function checkRecoverButtonIsDisabled(recoverPasswordButton){
        recoverPasswordButton.invoke('attr', 'aria-disabled').should('contain', 'true')
    }

});