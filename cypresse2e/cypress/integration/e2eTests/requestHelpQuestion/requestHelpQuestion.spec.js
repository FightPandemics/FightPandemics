import RequestHelpQuestion from '../../../elements/pages/requestHelpQuestion';
import { LOCATION } from '../../constants';

describe('FightPandemics Request Help Questionnaire Page', () => {

    const requestHelpQuestion = new RequestHelpQuestion();

    context('User goes to request help question 1', () => {
        beforeEach(() => {
            requestHelpQuestion.visitRequestHelpOne();
        });

        it('Question 1 of 2 text is visible', () => {
            requestHelpQuestion.getQuestionNumber()
                .should('be.visible')
                .contains('Question ' + '1');
        });

        it('Question 1 is visible', () => {
            requestHelpQuestion.getQuestion()
                .should('be.visible')
                .contains('What type of help do you need?');
        });

        it('Need medical help answer option is visible and clickable', () => {
            var medicalAnswer = requestHelpQuestion.getMedicalAnswer();
            medicalAnswer.should('be.visible');
            medicalAnswer.contains('Medical:' + ' I have symptoms of COVID-19.').click();
        });

        it('Need other help answer option is visible and clickable', () => {
            var otherAnswer = requestHelpQuestion.getOtherAnswer();
            otherAnswer.should('be.visible');
            otherAnswer.contains('Other Help:' + ' I need assistance getting groceries/medicine/etc.');
            otherAnswer.click({ force: true });
        });

        it('Back button is visible and clickable for question 1', () => {
            var backButton = requestHelpQuestion.getBackButtonOne();
            backButton.should('be.visible');
            backButton.find('img').click();
        });

        it('Next button is visible and clickable for question 1', () => {
            var nextButton = requestHelpQuestion.getBackButtonOne();
            nextButton.should('be.visible');
            nextButton.find('img').click();
        });

    });

    context('User goes to request help question 2', () => {
        beforeEach(() => {
            requestHelpQuestion.visitRequestHelpTwo();
        });

        it('Question 2 of 2 text is visible', () => {
            requestHelpQuestion.getQuestionNumber()
            .should('be.visible')
            .contains('Question ' + '2');
        });

        it('Question 2 is visible', () => {
            requestHelpQuestion.getQuestion()
            .should('be.visible')
            .contains('Where are you located?');
        });

        it('Question 2 subtext is visible', () => {
            requestHelpQuestion.getQuestionSubtext()
            .should('be.visible')
            .contains('We want to show you the most relevant results');
        });

        it('User can type in location field and the location list appears', () => {
            var locationField = requestHelpQuestion.getRhLocationField();
            locationField.should('be.visible').click();
            locationField.type(LOCATION).and('have.attr', 'aria-expanded', 'true');
        });

        it('Location subtext is visible', () => {
            requestHelpQuestion.getLocationSubtext()
            .should('be.visible')
            .contains('Enter address, zip code, or city');
        });

        it('Share location link is visible and clickable', () => {
            var shareLocation = requestHelpQuestion.getRhShareLocation();
            shareLocation.should('be.visible');
            shareLocation.contains('Share My Location').click();
        });

        it('Show postings from anywhere is visible and clickable', () => {
            var showPostings = requestHelpQuestion.getRhShowPostings();
            showPostings.should('be.visible');
            showPostings.contains('Show me postings from anywhere');
            showPostings.click({force: true});
        });


        it('Back button is visible and clickable for question 2', () => {
            var backButton = requestHelpQuestion.getBackButtonTwo();
            backButton.should('be.visible');
            backButton.find('img').click();
        });


        it('Next button is visible and clickable for question 2', () => {
            var nextButton = requestHelpQuestion.getBackButtonTwo();
            nextButton.should('be.visible');
            nextButton.find('img').click();
        });
    });

});
