import PrivacyPolicyPage from "../../../elements/pages/privacyPolicy";
import privacyPolicyContent from "../../../fixtures/privacyPolicyContent.json";
import Logo from "../../../elements/pages/fpLogo";

describe("Private Policy for FightPandemics", () => {
  const privacyPolicy = new PrivacyPolicyPage();
  const logo = new Logo();
  context("Check on Private Policy page for FightPandemics", () => {
    beforeEach(() => {
      privacyPolicy.visit();
    });

    it("FP logo is visible and clickable", () => {
      cy.checkFpLogoIsVisibleAndClickable(logo.getFpLogoLocator());
    });

    it("Check Privacy Policy Header is visible", () => {
      privacyPolicy
        .getPrivacyPolicyH2()
        .invoke("text")
        .should("eq", "Privacy Policy");
    });

    it("Get and Validate the PRIVACY POLICY content for the FIRST paragraph starting with-FightPandemics, INC", (dataType = "paraPolicyCx", ParaNum = 1) => {
      validateEachPara(dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the SECOND paragraph starting with-By using the Services, YOU consent", (dataType = "paraPolicyCx", ParaNum = 2) => {
      validateEachPara(dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the THIRD paragraph starting with-“Personal data” means any information", (dataType = "paraPolicyCx", ParaNum = 3) => {
      validateEachPara(dataType, ParaNum);
    });
    it("Get and Validate the PRIVACY POLICY content for the FOURTH paragraph starting with-On the basis of the above, the Company herein provides YOU", (dataType = "paraPolicyCx", ParaNum = 4) => {
      validateEachPara(dataType, ParaNum);
    });
    it("Get and Validate the PRIVACY POLICY content for the FIRST paragraph with Order List starting with-1. Who We are and how YOU can contact Us", (dataType = "paraPolicyCxWithOrdList", ParaNum = 1) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);

      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the SECOND paragraph with Order List starting with-2. Your rights relating your Personal Data", (dataType = "paraPolicyCxWithOrdList", ParaNum = 2) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the THIRD paragraph with Order List starting with-3. How to exercise your rights", (dataType = "paraPolicyCxWithOrdList", ParaNum = 3) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the FOURTH paragraph with Order List starting with-4. If YOU would like to submit a complaint regarding this Privacy Policy", (dataType = "paraPolicyCxWithOrdList", ParaNum = 4) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the FIFTH paragraph with Order List starting with-5. Why We collect your Personal Data", (dataType = "paraPolicyCxWithOrdList", ParaNum = 5) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the SIXTH paragraph with Order List starting with-6. What Personal Data We collect", (dataType = "paraPolicyCxWithOrdList", ParaNum = 6) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the SEVENTH paragraph with Order List starting with-7. Aggregated Data", (dataType = "paraPolicyCxWithOrdList", ParaNum = 7) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the EIGHTH paragraph with Order List starting with-8. How We Use Your Personal Data and Why", (dataType = "paraPolicyCxWithOrdList", ParaNum = 8) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the NINETH paragraph with Order List starting with-9. What happens when YOU do not provide necessary Personal Data?", (dataType = "paraPolicyCxWithOrdList", ParaNum = 9) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the TENTH paragraph with Order List starting with-10. With Whom We Share Your Personal Data?", (dataType = "paraPolicyCxWithOrdList", ParaNum = 10) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });
    it("Get and Validate the PRIVACY POLICY content for the ELEVENTH paragraph with Order List starting with-11. How long We store your Personal Data?", (dataType = "paraPolicyCxWithOrdList", ParaNum = 11) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the TWELVETH paragraph with Order List starting with-12. Where We Store Your Personal Data", (dataType = "paraPolicyCxWithOrdList", ParaNum = 12) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });
    it("Get and Validate the PRIVACY POLICY content for the THIRTEENTH paragraph with Order List starting with-13. How We Protect Your Personal Data", (dataType = "paraPolicyCxWithOrdList", ParaNum = 13) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the FOURTEENTH paragraph with Order List starting with-14. Contact Us", (dataType = "paraPolicyCxWithOrdList", ParaNum = 14) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the FIFTEENTH paragraph with Order List starting with-15. Changes to Our Privacy Policy", (dataType = "paraPolicyCxWithOrdList", ParaNum = 15) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });
    it("Get and Validate Date of Document created", () => {
      privacyPolicy
        .getDateDocumented()
        .invoke("text")
        .should("eq", "April 23rd, 2020");
    });
  });

  //to validate each paragraph
  function validateEachPara(dataType, ParaNum) {
    const objData = getObjectData(dataType, ParaNum);
    const text = objData.text;
    var contentPara = privacyPolicy.getLocationPara(ParaNum).contains(text);
  }

  //to validate each paragraph with order list
  function validateEachParaWithOrdList(getMethod, dataType, ParaNum) {
    const objData = getObjectData(dataType, ParaNum);
    const text = objData.text;
    const email = objData.email;
    var contentPara = getMethod.contains(text);

    if (email.length > 0) {
      const email = objData.email;
      const emailRef = `mailto:${email}`;
      var emaiLink = contentPara
        .find("a")
        .should("have.attr", "href", emailRef)
        .then(($link) => {
          expect($link.text()).contains(email);
          expect($link).to.respondTo("click");
        });
    }
  }
  //to get object Privacydata
  function getObjectData(dataType, ParaNum) {
    var objArray;
    var objCx;
    var returnObjCx = [];
    switch (dataType) {
      case "paraPolicyCx":
        objArray = privacyPolicyContent.paraPolicyCx;
        break;
      case "paraPolicyCxWithOrdList":
        objArray = privacyPolicyContent.paraPolicyCxWithOrdList;
        break;
      default:
        break;
    }
    objArray.forEach(function (objCx) {
      if (objCx.id == ParaNum) {
        returnObjCx = objCx;
      }
      if (returnObjCx.length > 0) return returnObjCx;
    });
    return returnObjCx;
  }
});
