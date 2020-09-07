class FeedbackModal {

    feedbackButton = '#NAV_FDB';
    feedbackHeading = 'h3';
    feedbackScale = '.rectangle';
    feedbackScaleText = '.scale-text';
    closeModal = '.am-modal-close';
   

    constructor() { }

    visit() {
        cy.visit('');
    }
    
    getFeedbackButton() {
        return cy.get(this.feedbackButton);
    }

    getFeedbackHeading() {
        return cy,get(this.feedbackHeading);
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
}
export default FeedbackModal;