import PrivacyPolicy from "../../../elements/pages/privacyPolicy";
import privacyPolicyContent from "../../../fixtures/privacyPolicyContent.json";
import Logo from "../../../elements/pages/fpLogo";

describe("Private Policy for FightPandemics", () => {
  const privacyPolicy = new PrivacyPolicy();
  const logo = new Logo();
  const dateOfDocument = "April 23rd, 2020";

  context(
    "Check on Existing each Paragraph of Private Policy page for FightPandemics",
    () => {
      before(() => {
        privacyPolicy.visit();
      });

      it("Check Privacy Policy Header is existing", () => {
        privacyPolicy
          .getPrivacyPolicyH2()
          .invoke("text")
          .should("eq", "Privacy Policy");
      });

      it("Get and Validate the PRIVACY POLICY existing for the FIRST paragraph starting with-FightPandemics, INC", (paraNum = 1) => {
        validateEachParaExisting(privacyPolicyContent.paraPolicyCx[0], paraNum);
      });

      it("Get and Validate the PRIVACY POLICY existing for the SECOND paragraph starting with-By using the Services, YOU consent", (paraNum = 2) => {
        validateEachParaExisting(privacyPolicyContent.paraPolicyCx[1], paraNum);
      });

      it("Get and Validate the PRIVACY POLICY existing for the THIRD paragraph starting with-“Personal data” means any information", (paraNum = 3) => {
        validateEachParaExisting(privacyPolicyContent.paraPolicyCx[2], paraNum);
      });
      it("Get and Validate the PRIVACY POLICY existing for the FOURTH paragraph starting with-On the basis of the above, the Company herein provides YOU", (paraNum = 4) => {
        validateEachParaExisting(privacyPolicyContent.paraPolicyCx[3], paraNum);
      });
      it("Get and Validate the PRIVACY POLICY existing for the FIRST paragraph with Order List starting with-1. Who We are and how YOU can contact Us", (paraNum = 11) => {
        validateEachParaExisting(privacyPolicyContent.paraPolicyCx[4], paraNum);
      });

      it("Get and Validate the PRIVACY POLICY existing for the SECOND paragraph with Order List starting with-2. Your rights relating your Personal Data", (paraNum = 12) => {
        validateEachParaExisting(privacyPolicyContent.paraPolicyCx[5], paraNum);
      });

      it("Get and Validate the PRIVACY POLICY existing for the THIRD paragraph with Order List starting with-3. How to exercise your rights", (paraNum = 13) => {
        validateEachParaExisting(privacyPolicyContent.paraPolicyCx[6], paraNum);
      });

      it("Get and Validate the PRIVACY POLICY existing for the FOURTH paragraph with Order List starting with-4. If YOU would like to submit a complaint regarding this Privacy Policy", (paraNum = 14) => {
        validateEachParaExisting(privacyPolicyContent.paraPolicyCx[7], paraNum);
      });

      it("Get and Validate the PRIVACY POLICY existing for the FIFTH paragraph with Order List starting with-5. Why We collect your Personal Data", (paraNum = 15) => {
        validateEachParaExisting(privacyPolicyContent.paraPolicyCx[8], paraNum);
      });

      it("Get and Validate the PRIVACY POLICY existing for the SIXTH paragraph with Order List starting with-6. What Personal Data We collect", (paraNum = 16) => {
        validateEachParaExisting(privacyPolicyContent.paraPolicyCx[9], paraNum);
      });

      it("Get and Validate the PRIVACY POLICY existing for the SEVENTH paragraph with Order List starting with-7. Aggregated Data", (paraNum = 17) => {
        validateEachParaExisting(
          privacyPolicyContent.paraPolicyCx[10],
          paraNum,
        );
      });

      it("Get and Validate the PRIVACY POLICY existing for the EIGHTH paragraph with Order List starting with-8. How We Use Your Personal Data and Why", (paraNum = 18) => {
        validateEachParaExisting(
          privacyPolicyContent.paraPolicyCx[11],
          paraNum,
        );
      });

      it("Get and Validate the PRIVACY POLICY existing for the NINETH paragraph with Order List starting with-9. What happens when YOU do not provide necessary Personal Data?", (paraNum = 19) => {
        validateEachParaExisting(
          privacyPolicyContent.paraPolicyCx[12],
          paraNum,
        );
      });

      it("Get and Validate the PRIVACY POLICY existing for the TENTH paragraph with Order List starting with-10. With Whom We Share Your Personal Data?", (paraNum = 110) => {
        validateEachParaExisting(
          privacyPolicyContent.paraPolicyCx[13],
          paraNum,
        );
      });
      it("Get and Validate the PRIVACY POLICY existing for the ELEVENTH paragraph with Order List starting with-11. How long We store your Personal Data?", (paraNum = 111) => {
        validateEachParaExisting(
          privacyPolicyContent.paraPolicyCx[14],
          paraNum,
        );
      });

      it("Get and Validate the PRIVACY POLICY existing for the TWELVETH paragraph with Order List starting with-12. Where We Store Your Personal Data", (paraNum = 112) => {
        validateEachParaExisting(
          privacyPolicyContent.paraPolicyCx[15],
          paraNum,
        );
      });
      it("Get and Validate the PRIVACY POLICY existing for the THIRTEENTH paragraph with Order List starting with-13. How We Protect Your Personal Data", (paraNum = 113) => {
        validateEachParaExisting(
          privacyPolicyContent.paraPolicyCx[16],
          paraNum,
        );
      });

      it("Get and Validate the PRIVACY POLICY existing for the FOURTEENTH paragraph with Order List starting with-14. Contact Us", (paraNum = 114) => {
        validateEachParaExisting(
          privacyPolicyContent.paraPolicyCx[17],
          paraNum,
        );
      });
      it("Get and Validate the PRIVACY POLICY existing for the FIFTEENTH paragraph with Order List starting with-15. Changes to Our Privacy Policy", (paraNum = 115) => {
        validateEachParaExisting(
          privacyPolicyContent.paraPolicyCx[18],
          paraNum,
        );
      });
      it("Get and Validate Date of Document created", () => {
        privacyPolicy
          .getDateDocumented()
          .invoke("text")
          .should("eq", dateOfDocument);
      });
    },
  );
  context(
    "Check on FightPandemics Logo and Email links on the Privacy Policy Page for FightPandemics",
    () => {
      beforeEach(() => {
        privacyPolicy.visit();
      });

      it("FP logo is visible and clickable", () => {
        cy.checkFpLogoIsVisibleAndClickable(logo.getFpLogoLocator());
      });

      it("Emails are visible with correct link", () => {
        var numEmails = privacyPolicyContent.paraPolicyWithEmail.length;

        for (var i = 0; i < numEmails; i++) {
          checkEmailEachParagraph(
            privacyPolicyContent.paraPolicyWithEmail[i].id,
            privacyPolicy.legalEmail,
            privacyPolicy.legalEmailRef,
          );
        }
      });
    },
  );

  //to validate each paragraph existing
  function validateEachParaExisting(paraPolicyCxObject, paraNum) {
    const text = paraPolicyCxObject.text;
    privacyPolicy.getLocationPara(paraNum).contains(text);
  }

  //to check email each paragraph
  function checkEmailEachParagraph(paraNum, email, link) {
    privacyPolicy
      .getLocationPara(paraNum)
      .contains(email)
      .should("be.visible")
      .and("have.attr", "href", link);
  }
});
