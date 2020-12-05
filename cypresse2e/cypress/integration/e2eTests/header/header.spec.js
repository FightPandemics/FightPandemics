import Header from "../../../elements/pages/header";
import Logo from "../../../elements/pages/fpLogo";

describe("FightPandemics Navigation bar", () => {
  const header = new Header();
  const logo = new Logo();

  context(
    "When user is not logged in Register and Login button are visible",
    () => {
      beforeEach(() => {
        header.visit();
      });

      it("Logo is present and visible", () => {
        cy.checkFpLogoIsVisibleAndClickable(logo.getFpLogoLocator());
      });

      it("Login and Registers buttons should be visible when user is not logged in", () => {
        var signInLink = header.getSignInLink();
        signInLink.should("be.visible").and("have.attr", "href", "/auth/login");
        var joinInLink = header.getJoinNowLink();
        joinInLink
          .should("be.visible")
          .and("have.attr", "href", "/auth/signup");
      });

      it("About us, Help Board and Feedback buttons are visible", () => {
        header
          .getAboutUsLink()
          .should("be.visible")
          .and("have.attr", "href", "/about-us");
        header
          .getHelpBoardLink()
          .should("be.visible")
          .and("have.attr", "href", "/feed");
        header
          .getFeedbackButton()
          .find("img")
          .should("have.attr", "alt", "Icon");
      });
    },
  );

  context("Internationalisation - User can select language", () => {
    before(() => {
      header.visit();
    });

    it("User can see Global International Languages icon", () => {
      header
        .getGlobeIconLanguages()
        .should("have.attr", "alt", "Icon")
        .parent()
        .should("be.visible")
        .should("have.class", "ant-dropdown-trigger icon-btn");
    });

    it("User can click on Global International Languages icon and see English(American English) as default", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_EN_US",
        "English (American English)",
        "Sign In",
        "Help Board",
        "bold",
      );
    });

    it("User can click on Global International Languages icon and choose Arabic (العربية) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_AR",
        "Arabic (العربية)",
        "تسجيل الدخول",
        "لوحة المساعدة",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Chinese Simplified (简体中文) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_ZN_CN",
        "Chinese Simplified (简体中文)",
        "登录",
        "帮助版面",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Chinese Traditional (繁體中文) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_ZH_TW",
        "Chinese Traditional (繁體中文)",
        "登入",
        "幫助版面",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose English (British English) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_EN_GB",
        "English (British English)",
        "Sign In",
        "Help Board",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose French (Français) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_FR",
        "French (Français)",
        "Se connecter",
        "Tableau d'aide",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose German (Deutsch) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_DE",
        "German (Deutsch)",
        "Anmelden",
        "Hilfebrett",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Indonesian (Bahasa Indonesia) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_ID",
        "Indonesian (Bahasa Indonesia)",
        "Masuk",
        "Papan Bantuan",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Italian (Italiano) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_IT",
        "Italian (Italiano)",
        "Accedi",
        "Bacheca di aiuto",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Kannada (ಕನ್ನಡ) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_KN_IN",
        "Kannada (ಕನ್ನಡ)",
        "ಸೈನ್ ಇನ್ ಮಾಡಿ",
        "ಸಹಾಯ ಮಂಡಳಿ",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Macedonian (македонски) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_MK_MK",
        "Macedonian (македонски)",
        "Најави се",
        "Одбор за помош",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Malay (Bahasa Melayu) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_MS_MY",
        "Malay (Bahasa Melayu)",
        "Log masuk",
        "Papan Bantuan",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Polish (Polski) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_PL",
        "Polish (Polski)",
        "Zaloguj się",
        "Forum pomocy",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Portuguese (Português) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_PT_PT",
        "Portuguese (Português)",
        "Entrar",
        "Quadro de Ajuda",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Russian (русский) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_RU",
        "Russian (русский)",
        "Войти",
        "Доска объявлений",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Spanish (Español de España) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_ES_ES",
        "Spanish (Español de España)",
        "Iniciar sesión",
        "Tablero de ayuda",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Tagalog (Tagalog) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_TL",
        "Tagalog (Tagalog)",
        "Mag-sign In",
        "Board ng Pag-Tulong",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Telugu (తెలుగు) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_TE_IN",
        "Telugu (తెలుగు)",
        "సైన్ ఇన్ చేయండి",
        "సహాయ బోర్డు",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Thai (ไทย) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_TH",
        "Thai (ไทย)",
        "เข้าสู่ระบบ",
        "บอร์ดความช่วยเหลือ",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Turkish (Türkçe) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_TR",
        "Turkish (Türkçe)",
        "Oturum Aç",
        "Yardım Panosu",
        "normal",
      );
    });

    it("User can click on Global International Languages icon and choose Vietnamese (Tiếng Việt) ", () => {
      selectAndValidateSpecificLanguage(
        header.getGlobeIconLanguages(),
        "div#NAV_LS_VI",
        "Vietnamese (Tiếng Việt)",
        "Đăng nhập",
        "Bảng Trợ giúp",
        "normal",
      );
    });
  });

  function selectAndValidateSpecificLanguage(
    getMethod,
    languageSelector,
    text,
    signInText,
    helpBoardLink,
    style,
  ) {
    var language;
    language = getMethod
      .parent()
      .click({ force: true })
      .get(languageSelector)
      .should(($languageEl) => {
        expect($languageEl).to.contain(text);
        expect($languageEl).to.have.attr("style").contains(style);
      });
    //after clicking style is changed to bold
    language
      .click({ force: true })
      .should("have.attr", "style", "font-weight: bold;");
    header.getSignInLink().invoke("text").should("equal", signInText);
    header.getHelpBoardLink().invoke("text").should("equal", helpBoardLink);
  }
});
