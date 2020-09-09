class FeedbackModal {

    feedbackIcon = 'button#NAV_FDB';
    feedbackHeadingOne = '.am-modal-body h3';
    feedbackScale = '.rectangle';
    feedbackScaleText = '.scale-text';
    closeModal = '.am-modal-close';
    feedbackHeadingTwo = '.am-modal-body h2';
    feebackQuestions = 'label';
    feedbackInputOne = 'div > input:nth-child(1)';
    feedbackInputTwo = 'div > input:nth-child(2)';
    feedbackInputThree = 'div > input:nth-child(3)';
    button = 'a span';
    radioAnswers = '.ant-radio-wrapper';



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

    getFeedbackInputOne() {
        return cy.get(this.feedbackInputOne);
    }

    getFeedbackInputTwo() {
        return cy.get(this.feedbackInputTwo);
    }

    getFeedbackInputThree() {
        return cy.get(this.feedbackInputThree);
    }

    getButton() {
        return cy.get(this.button);
    }

    getRadioAnswers() {
        return cy.get(this.radioAnswers);
    }
}
export default FeedbackModal;