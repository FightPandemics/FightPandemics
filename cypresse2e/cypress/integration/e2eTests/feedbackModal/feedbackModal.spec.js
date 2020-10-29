import FeedbackModal from '../../../elements/pages/feedbackModal';
import buttonNames from '../../../fixtures/buttonNames.json';

describe('FightPandemics Feedback Modal', () => {

    const feedback = new FeedbackModal();
    var headingOneText = "How well does FightPandemics meet your needs?";
    var headingTwoText = "Thank you for being an early user of FightPandemics!";
    var headingThreeText = "We are almost done!";

    context('User provides feedback on FightPandemics', () => {
        before(() => {
            feedback.visit();
        });

        it('Feedback icon on homepage is visible and clickable', () => {
            feedback.getFeedbackIcon()
                .should('be.visible').click();
        });

        it('Feedback scale heading is visible', () => {
            cy.pageContainsHeading(feedback.getFeedbackH3(), headingOneText);
        });

        it('Feedback scale is visible', () => {
            feedback.getFeedbackScale()
                .should('be.visible');
        });

        it('Feedback scale text is visible', () => {
            feedback.getFeedbackScaleText()
                .should('be.visible')
                .contains('Poorly' + 'Very well');
        });

        it('Choose rating 1', () => {
            clickRating(0);
        });

        context('User chooses a rating on the scale', () => {
            beforeEach(() => {
                feedback.visit();
                feedback.getFeedbackIcon()
                    .should('be.visible').click();
            });

            it('Choose rating 2', () => {
                clickRating(1);
            });

            it('Choose rating 3', () => {
                clickRating(2);
            });

            it('Choose rating 4', () => {
                clickRating(3);
            });

            it('Choose rating 5', () => {
                clickRating(4);
            });

            it('Close icon is visible and clickable', () => {
                feedback.getCloseModal()
                    .should('be.visible').click();
            });

        });

        it('Feedback heading on screen two is visible', () => {
            cy.pageContainsHeading(feedback.getFeedbackH2(), headingTwoText);
        });

        it('Feedback question one on screen two is visible', () => {
            feedbackQuestion('Which features are the most valuable to you?');
        });

        it('Feedback question two on screen two is visible', () => {
            feedbackQuestion('If you could change one thing about FightPandemics, what would it be?');
        });

        it('Feedback question three on screen two is visible', () => {
            feedbackQuestion('Any other feedback for us?');
        });

        it('User can view input field and type answer for feedback question one on screen two', () => {
            feedbackAnswer(0, 'Help Board');
        });

        it('User can view input field and type answer for feedback question two on screen two', () => {
            feedbackAnswer(1, 'Make FP available to everyone.');
        });

        it('User can view input field and type answer for feedback question three on screen two', () => {
            feedbackAnswer(2, 'None.');
        });

        it('Next button on feedback screen two is visible and clickable', () => {
            feedbackButton(buttonNames.next);
        });

        it('Feedback heading on screen three is visible', () => {
            cy.pageContainsHeading(feedback.getFeedbackH2(), headingThreeText);
        });

        it('Feedback question one on screen three is visible', () => {
            feedbackQuestion('What is your age?');
        });

        it('User can view input field and type answer for feedback question one on screen three', () => {
            feedbackAnswer(0, '25');
        });

        it('Feedback question two on screen three is visible', () => {
            feedbackQuestion('How has COVID-19 impacted you?');
        });

        it('Feedback radio answers for feedback question two on screen three is visible and clickable', () => {
            feedback.getRadioAnswersList()
                .should('be.visible');
            feedback.getRadioAnswers().eq(0).click();
            feedback.getRadioAnswers().eq(1).click();
            feedback.getRadioAnswers().eq(2).click();
            feedback.getRadioAnswers().eq(3).click();
        });

        it('Submit Feedback button on feedback screen three is visible and clickable', () => {
            feedbackButton(buttonNames.submit);
        });

    });

    function clickRating(index) {
        feedback.getFeedbackScale()
            .find('div').eq(index).click();
    }

    function feedbackQuestion(question) {
        feedback.getFeedbackQuestions()
            .should('be.visible')
            .contains(question);
    }

    function feedbackAnswer(index, answer) {
        feedback.getFeedbackInputList()
            .should('be.visible').eq(index).click()
            .invoke('val', answer);
    }

    function feedbackButton(buttonText) {
        feedback.getButton()
            .should('be.visible')
            .contains(buttonText).click();
    }

});