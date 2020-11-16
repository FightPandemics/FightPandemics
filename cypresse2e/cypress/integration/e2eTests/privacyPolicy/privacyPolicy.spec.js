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

      it("Get and Validate the PRIVACY POLICY content for the FIRST paragraph starting with-FightPandemics, INC", (ParaNum = 1) => {
        validateEachPara(privacyPolicyContent.paraPolicyCx[0]);
      });

      it("Get and Validate the PRIVACY POLICY content for the SECOND paragraph starting with-By using the Services, YOU consent", (ParaNum = 2) => {
        validateEachPara(privacyPolicyContent.paraPolicyCx[1]);
      });

      it("Get and Validate the PRIVACY POLICY content for the THIRD paragraph starting with-“Personal data” means any information", (ParaNum = 3) => {
        validateEachPara(privacyPolicyContent.paraPolicyCx[2]);
      });
      it("Get and Validate the PRIVACY POLICY content for the FOURTH paragraph starting with-On the basis of the above, the Company herein provides YOU", (ParaNum = 4) => {
        validateEachPara(privacyPolicyContent.paraPolicyCx[3]);
      });
      it("Get and Validate the PRIVACY POLICY content for the FIRST paragraph with Order List starting with-1. Who We are and how YOU can contact Us", (ParaNum = 11) => {
        validateEachPara(privacyPolicyContent.paraPolicyCx[4]);
      });

      it("Get and Validate the PRIVACY POLICY content for the SECOND paragraph with Order List starting with-2. Your rights relating your Personal Data", (ParaNum = 12) => {
        //const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
        validateEachPara(privacyPolicyContent.paraPolicyCx[5]);
      });

      it("Get and Validate the PRIVACY POLICY content for the THIRD paragraph with Order List starting with-3. How to exercise your rights", (ParaNum = 13) => {
        //const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
        validateEachPara(privacyPolicyContent.paraPolicyCx[6]);
      });

      it("Get and Validate the PRIVACY POLICY content for the FOURTH paragraph with Order List starting with-4. If YOU would like to submit a complaint regarding this Privacy Policy", (ParaNum = 14) => {
        //const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
        validateEachPara(privacyPolicyContent.paraPolicyCx[7]);
      });

      it("Get and Validate the PRIVACY POLICY content for the FIFTH paragraph with Order List starting with-5. Why We collect your Personal Data", (ParaNum = 15) => {
        //const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
        validateEachPara(privacyPolicyContent.paraPolicyCx[8]);
      });

      it("Get and Validate the PRIVACY POLICY content for the SIXTH paragraph with Order List starting with-6. What Personal Data We collect", (ParaNum = 16) => {
        //const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
        validateEachPara(privacyPolicyContent.paraPolicyCx[9]);
      });

      it("Get and Validate the PRIVACY POLICY content for the SEVENTH paragraph with Order List starting with-7. Aggregated Data", (ParaNum = 17) => {
        //const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
        validateEachPara(privacyPolicyContent.paraPolicyCx[10]);
      });

      it("Get and Validate the PRIVACY POLICY content for the EIGHTH paragraph with Order List starting with-8. How We Use Your Personal Data and Why", (ParaNum = 18) => {
        validateEachPara(privacyPolicyContent.paraPolicyCx[11]);
      });

      it("Get and Validate the PRIVACY POLICY content for the NINETH paragraph with Order List starting with-9. What happens when YOU do not provide necessary Personal Data?", (ParaNum = 19) => {
        validateEachPara(privacyPolicyContent.paraPolicyCx[12]);
      });

      it("Get and Validate the PRIVACY POLICY content for the TENTH paragraph with Order List starting with-10. With Whom We Share Your Personal Data?", (ParaNum = 110) => {
        validateEachPara(privacyPolicyContent.paraPolicyCx[13]);
      });
      it("Get and Validate the PRIVACY POLICY content for the ELEVENTH paragraph with Order List starting with-11. How long We store your Personal Data?", (ParaNum = 111) => {
        validateEachPara(privacyPolicyContent.paraPolicyCx[14]);
      });

      it("Get and Validate the PRIVACY POLICY content for the TWELVETH paragraph with Order List starting with-12. Where We Store Your Personal Data", (ParaNum = 112) => {
        validateEachPara(privacyPolicyContent.paraPolicyCx[15]);
      });
      it("Get and Validate the PRIVACY POLICY content for the THIRTEENTH paragraph with Order List starting with-13. How We Protect Your Personal Data", (ParaNum = 113) => {
        validateEachPara(privacyPolicyContent.paraPolicyCx[16]);
      });

      it("Get and Validate the PRIVACY POLICY content for the FOURTEENTH paragraph with Order List starting with-14. Contact Us", (ParaNum = 114) => {
        validateEachPara(privacyPolicyContent.paraPolicyCx[17]);
      });
      it("Get and Validate the PRIVACY POLICY content for the FIFTEENTH paragraph with Order List starting with-15. Changes to Our Privacy Policy", (ParaNum = 115) => {
        validateEachPara(privacyPolicyContent.paraPolicyCx[18]);
      });
      it("Get and Validate Date of Document created", () => {
        privacyPolicy
          .getDateDocumented()
          .invoke("text")
          .should("eq", dateOfDocument);
      });

      context(
        "Check on FightPandemics Logo and Email links on the Privacy Policy Page for FightPandemics",
        () => {
          beforeEach(() => {
            privacyPolicy.visit();
          });

          it("FP logo is visible and clickable", () => {
            cy.checkFpLogoIsVisibleAndClickable(logo.getFpLogoLocator());
          });

          it("Emails are visible and clickable", () => {
            var numEmails = privacyPolicyContent.paraPolicyWithEmail.length;

            for (var i = 0; i < numEmails; i++) {
              checkEmaiEachParagraph(
                privacyPolicyContent.paraPolicyWithEmail[i].id,
                privacyPolicy.legalEmail,
                privacyPolicy.legalEmailRef,
              );
            }
          });
        },
      );

      //to validate each paragraph
      function validateEachPara(objData) {
        const id = objData.id;
        const text = objData.text;
        privacyPolicy.getLocationPara(id).contains(text);
      }

      //to check email each paragraph
      function checkEmaiEachParagraph(paraNum, email, link) {
        privacyPolicy
          .getLocationPara(paraNum)
          .contains(email)
          .should("be.visible")
          .and("have.attr", "href", link);
      }
    },
  );
});
