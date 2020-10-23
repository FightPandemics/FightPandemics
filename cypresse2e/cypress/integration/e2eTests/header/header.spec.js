import Header from '../../../elements/pages/header';
import Logo from '../../../elements/pages/fpLogo';

describe('FightPandemics Navigation bar', () => {

	const header = new Header();
	const logo = new Logo();

	context('When user is not logged in Register and Login button are visible', () => {
		beforeEach(() => {
			header.visit();
		});

		it('Logo is present and visible', () => {
			cy.checkFpLogoIsVisibleAndClickable(logo.getFpLogoLocator());
		});

		it('Login and Registers buttons should be visible when user is not logged in', () => {
			var signInLink = header.getSignInLink();
			signInLink.should('be.visible').and('have.attr', 'href', '/auth/login');
			var joinInLink = header.getJoinNowLink();
			joinInLink.should('be.visible').and('have.attr', 'href', '/auth/signup');
		});

		it('About us, Help Board and Feedback buttons are visible', () => {
			header.getAboutUsLink().should('be.visible').and('have.attr', 'href', '/about-us');
			header.getHelpBoardLink().should('be.visible').and('have.attr', 'href', '/feed');
			header.getFeedbackButton().find('img').should('have.attr', 'alt', 'Icon');
		})
	});

	context('Internationalisation - User can select language', () => {

		beforeEach(() => {
			header.visit();
		});

		it('User can see Global International Languages icon', () => {
			header.getGlobeIconLanguages().should('be.visible').should('have.attr', 'alt', 'Icon')
				.should('have.class', 'ant-dropdown-trigger globe-icon-svg is-clickable')
		});

		it('User can click on Global International Languages icon and see English(American English) as default', () => {
			selectAndValidateSpecificLanguage(header.getGlobeIconLanguages(), 'div#NAV_LS_EN_US', 'English (American English)', 'Sign In', 'Help Board', 'bold');
		});

		it('User can click on Global International Languages icon and choose Chinese Traditional ', () => {
			selectAndValidateSpecificLanguage(header.getGlobeIconLanguages(), 'div#NAV_LS_ZH_TW', 'Chinese Traditional (繁體中文)', '登入', '幫助板', 'normal');
		});

		it('User can click on Global International Languages icon and choose English (British English) ', () => {
			selectAndValidateSpecificLanguage(header.getGlobeIconLanguages(), 'div#NAV_LS_EN_GB', 'English (British English)', 'Sign In', 'Help Board', 'normal');
		});

		it('User can click on Global International Languages icon and choose German (Deutsch) ', () => {
			selectAndValidateSpecificLanguage(header.getGlobeIconLanguages(), 'div#NAV_LS_DE', 'German (Deutsch)', 'Willkommen', 'Hilfebrett', 'normal');
		});

		it('User can click on Global International Languages icon and choose Polish (Polski) ', () => {
			selectAndValidateSpecificLanguage(header.getGlobeIconLanguages(), 'div#NAV_LS_PL', 'Polish (Polski)', 'Zaloguj się', 'Forum pomocy', 'normal');
		});

		it('User can click on Global International Languages icon and choose Peninsular Spanish (Español de España) ', () => {
			selectAndValidateSpecificLanguage(header.getGlobeIconLanguages(), 'div#NAV_LS_ES_ES', 'Peninsular Spanish (Español de España)', 'Iniciar sesión', 'Informes de Ayuda', 'normal');
		});

	});

	function selectAndValidateSpecificLanguage(getMethod, languageSelector, text, signInText, helpBoardLink, style) {
		var language;
		language = (getMethod).click().get(languageSelector).should(($languageEl) => {
			expect($languageEl).to.contain(text);
			expect($languageEl).to.have.attr('style').contains(style);
		});
		//after clicking style is changed to bold
		language.click({ force: true }).should('have.attr', 'style', 'font-weight: bold;');
		header.getSignInLink().invoke('text').should('equal', signInText);
		header.getHelpBoardLink().invoke('text').should('equal', helpBoardLink);
	}

});