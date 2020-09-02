class RequestHelpQuestion {

    questionNumber = 'h5';
    question = 'h2';
    medicalAnswer = '#RES1_MH';
    otherAnswer = '#RES1_OH';
    questionSubtext = 'p';
    rhLocationField = '#RES2_EAZ';
    locationSubtext = 'small';
    rhShareLocation = '#RES2_SL';
    rhShowPostings = '#RES2_SA';
    backButtonOne = '#RE1_BA';
    nextButtonOne = '#RE1_NE';
    backButtonTwo = '#RE2_BA';
    nextButtonTwo = '#RE2_NE';

    constructor() { }

    visitRequestHelpOne() {
        cy.visit('need-help');
    }

    visitRequestHelpTwo() {
        cy.visit('need-help#Step2');
    }

    getQuestionNumber() {
        return cy.get(this.questionNumber);
    }

    getQuestion() {
        return cy.get(this.question);
    }

    getMedicalAnswer() {
        return cy.get(this.medicalAnswer);
    }

    getOtherAnswer() {
        return cy.get(this.otherAnswer);
    }

    getQuestionSubtext() {
        return cy.get(this.questionSubtext);
    }

    getRhLocationField() {
        return cy.get(this.rhLocationField);
    }

    getLocationSubtext() {
        return cy.get(this.locationSubtext);
    }

    getRhShareLocation() {
        return cy.get(this.rhShareLocation);
    }

    getRhShowPostings() {
        return cy.get(this.rhShowPostings);
    }

    getBackButtonOne() {
        return cy.get(this.backButtonOne);
    }

    getNextButtonOne() {
        return cy.get(this.nextButtonOne);
    }

    getBackButtonTwo() {
        return cy.get(this.backButtonTwo);
    }

    getNextButtonTwo() {
        return cy.get(this.nextButtonTwo);
    }
}
export default RequestHelpQuestion;
