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
            var fpLogo = recoverPassword.getFpLogo();
            fpLogo.should('be.visible').and('have.attr', 'alt', 'Fight Pandemics logo').click();

        });
        
        it('Recover Password page contains heading and image', () => {          
            recoverPassword.getRecoverPasswordPageTitle().should('be.visible').contains(h4Heading);
            recoverPassword.getImage().should('be.visible');

        });

        it('Recover Password button is disabled', () => {
            checkRecoveryButtonIsDisabled(recoverPassword.getRecoveryPasswordButton());
        });

        it('Leaving email field blank triggers error', () => {
            var emailField = recoverPassword.getEmailField();
            emailField.should('be.visible').and('have.attr', 'name', 'email').focus().blur();
            var emailRequiredErrorMessage = recoverPassword.getErrorMessageField();
            emailRequiredErrorMessage.should('be.visible');
            emailRequiredErrorMessage.contains(REQUIRED_EMAIL_ERROR_MESSAGE);
            checkRecoveryButtonIsDisabled(recoverPassword.getRecoveryPasswordButton());

        });

        it('Entering invalid email triggers error', () => {
            var emailField = recoverPassword.getEmailField();
            emailField.should('be.visible').and('have.attr', 'name', 'email');
            emailField.type('qa.test.invalid@').focus().blur();
            var emailRequiredErrorMessage = recoverPassword.getErrorMessageField();
            emailRequiredErrorMessage.should('be.visible');
            emailRequiredErrorMessage.contains(INVALID_EMAIL_ERROR_MESSAGE);
            checkRecoveryButtonIsDisabled(recoverPassword.getRecoveryPasswordButton());

        });
        
        it('Entering correct email triggers Recovery Button is enabled', () => {
            var emailField = recoverPassword.getEmailField();
            emailField.should('be.visible').and('have.attr', 'name', 'email');
            emailField.type(VALID_SAMPLE_EMAIL).focus().blur();           
            var recoveryPasswordButton = recoverPassword.getRecoveryPasswordButton();
            recoveryPasswordButton.invoke('attr', 'aria-disabled').should('contain', 'false');
        });

        it('Back to Sign in screen link is visible and clickable', () => {
            var backToSignInPageLink = recoverPassword.getBackToSignInLink();
            backToSignInPageLink.should('be.visible');
            backToSignInPageLink.contains('Back to Sign In screen').click();

        });
    });

    function checkRecoveryButtonIsDisabled(recoveryPasswordButton){
        recoveryPasswordButton.invoke('attr', 'aria-disabled').should('contain', 'true')
    }

});