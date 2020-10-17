import ForgotPassword from '../../../elements/pages/forgotPassword'
import {VALID_SAMPLE_EMAIL} from '../../constants';
import {INVALID_EMAIL_ERROR_MESSAGE} from '../../constants';
import {REQUIRED_EMAIL_ERROR_MESSAGE} from '../../constants';


describe('FightPandemics Forgot Password Page', () => {

    const forgotPassword = new ForgotPassword();
    var h4Heading = "Forgot Password?";


    context('User is trying to recover forgotten password', () => {
        beforeEach(() => {
            forgotPassword.visit();
        });

        it('FP logo is visible and clickable', () => {
            cy.checkFpLogoIsVisibleAndClickable(forgotPassword.getFpLogoLocator());

        });
        
        it('Forgot Password page contains heading and image', () => {          
            cy.pageContainsHeadingAndImage(forgotPassword.getForgotPasswordPageTitleLocator(),h4Heading, forgotPassword.getImageLocator());
        });

        it('Submit button is disabled', () => {
            checkSubmitButtonIsDisabled(forgotPassword.getSubmitButton());
        });

        it('Leaving email field blank triggers error and Submit Button is disabled', () => {
            var emailField = forgotPassword.getEmailField();
            emailField.should('be.visible').and('have.attr', 'name', 'email').focus().blur();
            var emailRequiredErrorMessage = forgotPassword.getErrorMessageField();
            emailRequiredErrorMessage.should('be.visible');
            emailRequiredErrorMessage.contains(REQUIRED_EMAIL_ERROR_MESSAGE);
            checkSubmitButtonIsDisabled(forgotPassword.getSubmitButton());

        });

        it('Entering invalid email triggers error and Submit Button is disabled', () => {
            var emailField = forgotPassword.getEmailField();
            emailField.should('be.visible').and('have.attr', 'name', 'email');
            emailField.type('qa.test.invalid@').focus().blur();
            var emailRequiredErrorMessage = forgotPassword.getErrorMessageField();
            emailRequiredErrorMessage.should('be.visible');
            emailRequiredErrorMessage.contains(INVALID_EMAIL_ERROR_MESSAGE);
            checkSubmitButtonIsDisabled(forgotPassword.getSubmitButton());

        });
        
        it('Entering correct email triggers Submit Button is enabled', () => {
            var emailField = forgotPassword.getEmailField();
            emailField.should('be.visible').and('have.attr', 'name', 'email');
            emailField.type(VALID_SAMPLE_EMAIL).focus().blur();           
            var submitButton = forgotPassword.getSubmitButton();
            submitButton.invoke('attr', 'aria-disabled').should('contain', 'false');
        });

        it('Back to Sign in screen link is visible and clickable', () => {
            var backToSignInPageLink = forgotPassword.getBackToSignInLink();
            backToSignInPageLink.should('be.visible');
            backToSignInPageLink.contains('Back to Sign In screen').click();

        });
    });

    function checkSubmitButtonIsDisabled(submitButton){
        submitButton.invoke('attr', 'aria-disabled').should('contain', 'true');
    }

});