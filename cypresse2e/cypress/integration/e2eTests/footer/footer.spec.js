import Footer from '../../../elements/pages/footer';

describe('FightPandemics Footer Section', () => {

    const footer = new Footer();

    context('Footer section is visible on bottom of home page', () => {
        beforeEach(() => {
            footer.visit();
        });

        it('FP copyright text is visible', () => {
            var copyright = 'Copyright ' + '2020' + ' FightPandemics. All rights reserved.';
            footer.getCopyright().should('be.visible').contains(copyright);
        });

        it('About Us link is visible and clickable', () => {
            var aboutUs = footer.getAboutUs();
            aboutUs.should('be.visible').contains('About Us').click({ force: true });
        });

        it('FAQ link is visible and clickable', () => {
            var faq = footer.getFaq();
            faq.should('be.visible').contains('FAQ').click({ force: true });
        });

        it('Blog link is visible and clickable', () => {
            var blog = footer.getBlog();
            blog.should('be.visible').contains('Blog').click({ force: true });
        });

        it('Terms & Conditions link is visible and clickable', () => {
            var termsAndConditions = footer.getTermsAndConditions();
            termsAndConditions.should('be.visible').contains('Terms & Conditions').click({ force: true });
        });

        it('Privacy Policy link is visible and clickable', () => {
            var privacyPolicy = footer.getPrivacyPolicy();
            privacyPolicy.should('be.visible').contains('Privacy Policy').click({ force: true });
        });

        it('Cookies Policy link is visible and clickable', () => {
            var cookiesPolicy = footer.getCookiesPolicy();
            cookiesPolicy.should('be.visible').contains('Cookies Policy').click({ force: true });
        });
    });
});