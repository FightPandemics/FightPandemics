import FeedbackModal from '../../../elements/pages/feedbackModal';

describe('FightPandemics Feedback Modal', () => {

    const feedback = new FeedbackModal();

    context('User provides feedback on FightPandemics', () => {
        before(() => {
            feedback.visit();
        });


        it('Feedback icon on homepage is visible and clickable', () => {
            feedback.getFeedbackIcon()
                .should('be.visible').click();
        });

        it('Feedback scale heading is visible', () => {
            feedback.getFeedbackHeadingOne()
                .should('be.visible')
                .contains('How well does FightPandemics meet your needs?');
        });

        // it('Feedback scale numbers are visible and clickable', () => {
        //     feedback.getFeedbackScale()
        //         .should('be.visible')

        //     var rating = feedback.getFeedbackScale().find('div');
        //     console.log(rating);
        //     for (let i = 0; i < rating.length; i++) {
        //         describe('FightPandemics Feedback Modal', () => {
        //             it('Choose rating', () => {
        //                 rating[i].click()
        //                 cy.wait(5000)
        //             });
        //         });
        //     };

        // });
    });

});