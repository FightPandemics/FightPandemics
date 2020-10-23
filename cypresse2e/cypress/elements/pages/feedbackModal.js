class FeedbackModal {

    feedbackIcon = 'button#NAV_FDB';
    feedbackHeadingOne = '.am-modal-body h3';
    feedbackScale = '.rectangle';
    feedbackScaleText = '.scale-text';
    closeModal = '.am-modal-close';
    feedbackHeadingTwo = '.am-modal-body h2';
    feedbackQuestions = 'label';
    feedbackInputList = '.am-modal-body div > input';
    button = 'a span';
    radioAnswersList = '.ant-radio-wrapper';
    radioAnswers = '.ant-radio-input';

    constructor() { }

    visit() {
        cy.visit('');
    }

    getFeedbackIcon() {
        return cy.get(this.feedbackIcon);
    }

    getFeedbackHeadingOne() {
        return cy.get(this.feedbackHeadingOne);
    }

    getFeedbackScale() {
        return cy.get(this.feedbackScale);
    }

    getFeedbackScaleText() {
        return cy.get(this.feedbackScaleText);
    }

    getCloseModal() {
        return cy.get(this.closeModal);
    }

    getFeedbackHeadingTwo() {
        return cy.get(this.feedbackHeadingTwo);
    }

    getFeedbackQuestions() {
        return cy.get(this.feedbackQuestions);
    }

    getFeedbackInputList() {
        return cy.get(this.feedbackInputList);
    }

    getButton() {
        return cy.get(this.button);
    }

    getRadioAnswersList() {
        return cy.get(this.radioAnswersList);
    }

    getRadioAnswers() {
        return cy.get(this.radioAnswers);
    }
}
export default FeedbackModal;