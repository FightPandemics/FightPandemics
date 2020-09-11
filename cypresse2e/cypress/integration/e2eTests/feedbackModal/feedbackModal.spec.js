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

        it('Feedback scale text is visible', () => {
            feedback.getFeedbackScaleText()
                .should('be.visible')
                .contains('Poorly' + 'Very well');
        });

        context('User chooses a rating on the scale', () => {
            beforeEach(() => {
                feedback.visit();
                feedback.getFeedbackIcon()
                    .should('be.visible').click();
            });

            it('Choosing rating 1', () => {
                clickRating().eq(0)
            });
            it('Choosing rating 2', () => {
                feedback.getFeedbackScale().find('div').eq(1).click();
            });
            it('Choosing rating 3', () => {
                feedback.getFeedbackScale().find('div').eq(2).click();
            });
            it('Choosing rating 4', () => {
                feedback.getFeedbackScale().find('div').eq(3).click();
            });
            it('Choosing rating 5', () => {
                feedback.getFeedbackScale().find('div').eq(4).click();
            });

        
            // it.skip('Feedback scale numbers are visible and clickable', () => {
            //     feedback.getFeedbackScale()
            //         .should('be.visible')
            //     var rating = feedback.getFeedbackScale().find('div').click({ multiple: true });
            //     for (let i = 0; i < rating.length; i++) {
            //         rating[i]
            //     };
            //     cy.wait(5000)
            // });

            // it('Clicking Scale', () => {
            //     var rating = feedback.getFeedbackScale().find('div')
            //     rating.each((box, index, item) => {
            //         cy.wrap(box).click()
            //         cy.wait(5000)

            //     })
            // })

        });

    });

    function clickRating() {
        feedback.getFeedbackScale().should('be.visible');
        feedback.getFeedbackScale().find('div').click();
    }

});