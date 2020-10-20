import RequestHelpQuestion from '../../../elements/pages/requestHelpQuestion';
import { LOCATION } from '../../constants';

describe('FightPandemics Request Help Questionnaire', () => {

    const requestHelpQuestion = new RequestHelpQuestion();

    context('User goes to request help question 1', () => {
        beforeEach(() => {
            requestHelpQuestion.visitRequestHelpOne();
        });

        it('Question 1 of 2 heading is visible', () => {
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
            var medicalHelpAnswer = requestHelpQuestion.getMedicalHelpAnswer();
            medicalHelpAnswer.should('be.visible');
            medicalHelpAnswer.contains('Medical:' + ' I have symptoms of COVID-19.').click();

        });

        it('Need other help answer option is visible and clickable', () => {
            var otherHelpAnswer = requestHelpQuestion.getOtherHelpAnswer();
            otherHelpAnswer.should('be.visible');
            otherHelpAnswer.contains('Other Help:' + ' I need assistance getting groceries/medicine/etc.');
            otherHelpAnswer.click({ force: true });
        });

        it('Back button is visible and clickable for question 1', () => {
            clickButton(requestHelpQuestion.getBackButtonOne());
        });

        it('Next button is visible and clickable for question 1', () => {
            clickButton(requestHelpQuestion.getNextButtonOne());
        });

    });

    context('User goes to request help question 2', () => {
        beforeEach(() => {
            requestHelpQuestion.visitRequestHelpTwo();
        });

        it('Question 2 of 2 heading is visible', () => {
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

        it('User can type in location field and see a list of available locations', () => {
            var locationField = requestHelpQuestion.getRhLocationField();
            locationField.should('be.visible').click({ force: true });
            locationField.type(LOCATION);
            requestHelpQuestion.getRhLocationDropdown().should('be.visible');
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

        it('Show postings from anywhere link is visible and clickable', () => {
            var showPostings = requestHelpQuestion.getRhShowPostings();
            showPostings.should('be.visible');
            showPostings.contains('Show me postings from anywhere');
            showPostings.click({ force: true });
        });


        it('Back button is visible and clickable for question 2', () => {
            clickButton(requestHelpQuestion.getBackButtonTwo());
        });

    });

    function clickButton(button) {
        button.should('be.visible');
        button.find('img').click();
    }

});
