import PrivacyPolicyPage from "../../../elements/pages/privacyPolicy";
import PrivacyPolicyContent from "../../../fixtures/PrivacyPolicyContent.json";

describe("Private Policy for FightPandemics", () => {
  const privacyPolicy = new PrivacyPolicyPage();

  context("Check on Private Policy page for FightPandemics", () => {
    beforeEach(() => {
      privacyPolicy.visit();
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

    it("Get and Validate the PRIVACY POLICY content for the SECOND paragraph with Order List starting with-2. Your rights relating your Personal Data", (dataType = "paraPolicyCxOrdListWthnOrdList", ParaNum = 2) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaOrdListWithinOrder(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the THIRD paragraph with Order List starting with-3. How to exercise your rights", (dataType = "paraPolicyCxWithOrdList", ParaNum = 3) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the FIFTH paragraph with Order List starting with-5. Why We collect your Personal Data", (dataType = "paraPolicyCxWithOrdList", ParaNum = 5) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });


    it("Get and Validate the PRIVACY POLICY content for the NINETH paragraph with Order List starting with-9. What happens when YOU do not provide necessary Personal Data?", (dataType = "paraPolicyCxWithOrdList", ParaNum = 9) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaWithOrdList(getMethod, dataType, ParaNum);
    });

    it("Get and Validate the PRIVACY POLICY content for the TENTH paragraph with Order List starting with-10. With Whom We Share Your Personal Data?", (dataType = "paraPolicyCxOrdListWthnOrdList", ParaNum = 10) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaOrdListWithinOrder(getMethod, dataType, ParaNum);
    });
    it("Get and Validate the PRIVACY POLICY content for the ELEVENTH paragraph with Order List starting with-11. How long We store your Personal Data?", (dataType = "paraPolicyCxOrdListWthnOrdList", ParaNum = 11) => {
      const getMethod = privacyPolicy.getLocationParaWithOrdList(ParaNum);
      validateEachParaOrdListWithinOrder(getMethod, dataType, ParaNum);
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
    const text = objData.regularText;
    const strText = objData.strongText;

    var contentPara = privacyPolicy.getLocationPara(ParaNum).contains(text);
    if (strText.length > 0) {
      contentPara.find("strong").each(($el, i) => {
        expect($el.text()).to.equal(strText[i]);
      });
    }
  }
  //to validate each paragraph with order list
  function validateEachParaWithOrdList(getMethod, dataType, ParaNum) {
    const objData = getObjectData(dataType, ParaNum);
    const strText = objData.strongText;
    const firstDivTxt = objData.firstDivTypeTxt;
    const firstDivLink = objData.firstDivLink;
    const secondDivTxt = objData.secondDivTypeTxt;
    const secondtDivLink = objData.secondDivLink;
    var contentPara = getMethod
      .find("strong")
      .contains(strText)
      .should("be.visible");
    contentPara.next("div").then(($el) => {
      expect($el.text()).to.be.equal(firstDivTxt);
      if (firstDivLink != "") {
        expect($el.find("a").text()).to.be.equal(firstDivLink);
        expect($el.find("a")).to.respondTo("click");
      }
      if (secondDivTxt != "") {
        expect($el.next().text()).to.be.contain(secondDivTxt);
        if (secondtDivLink != "") {
          expect($el.next().find("a").text()).to.be.equal(secondtDivLink);
          expect($el.next().find("a")).to.respondTo("click");
        }
      }
    });
  }

  //to validate each paragraph order list within order list
  function validateEachParaOrdListWithinOrder(getMethod, dataType, ParaNum) {
    const objData = getObjectData(dataType, ParaNum);
    const strText = objData.strongText;
    const firstDivTxt = objData.firstDivTxt;
    const secondDivTxt = objData.secondDivTxt;
    const firstUTxt = objData.firstLUTypeTxt;
    const firstLTxt = objData.firstListTxt;
    const secondUTxt = objData.secondLUTypeTxt;
    const secondLTxt = objData.secondListTxt;
    const thirdUTxt = objData.thirdLUTypeTxt;
    const thirdLTxt = objData.thirdListTxt;
    const fourthUTxt = objData.fourthLUTypeTxt;
    const fourthLTxt = objData.fourthListTxt;
    const fifthUTxt = objData.fifthLUTypeTxt;
    const fifthLTxt = objData.fifthListTxt;
    const sixthhUTxt = objData.sixthLUTypeTxt;
    const sixthLTxt = objData.sixthListTxt;
    const seventhhUTxt = objData.seventhLUTypeTxt;
    const seventhLTxt = objData.seventhListTxt;
    var contentPara = getMethod
      .find("strong")
      .contains(strText)
      .should("be.visible")
      .next("div")
      .contains(firstDivTxt)
      .should("be.visible")
      .find("ol");
    //check on the list
    contentPara.find("li").each(($el, i) => {
      switch (i) {
        case 0:
          if (firstUTxt != "") {
            expect($el.find("u").text()).to.eq(firstUTxt);
          }
          if (firstLTxt != "") {
            expect($el.text()).to.include(firstLTxt);
          }
          break;
        case 1:
          if (secondUTxt != "") {
            expect($el.find("u").text()).to.eq(secondUTxt);
          }
          if (secondLTxt != "") {
            expect($el.text()).to.include(secondLTxt);
          }
          break;
        case 2:
          if (thirdUTxt != "") {
            expect($el.find("u").text()).to.eq(thirdUTxt);
          }
          if (thirdLTxt != "") {
            expect($el.text()).to.include(thirdLTxt);
          }
          break;
        case 3:
          if (fourthUTxt != "") {
            expect($el.find("u").text()).to.eq(fourthUTxt);
          }
          if (fourthLTxt != "") {
            expect($el.text()).to.include(fourthLTxt);
          }
          break;
        case 4:
          if (fifthUTxt != "") {
            expect($el.find("u").text()).to.eq(fifthUTxt);
          }
          if (fifthLTxt != "") {
            expect($el.text()).to.include(fifthLTxt);
          }
          break;
        case 5:
          if (sixthhUTxt != "") {
            expect($el.find("u").text()).to.eq(sixthhUTxt);
          }
          if (sixthLTxt != "") {
            expect($el.text()).to.include(sixthLTxt);
          }
          break;
        case 6:
          if (seventhhUTxt != "") {
            expect($el.find("u").text()).to.eq(seventhhUTxt);
          }
          if (seventhLTxt != "") {
            expect($el.text()).to.include(seventhLTxt);
          }
          break;
        default:
          break;
      }
    });
    //check on the next div
    if (secondDivTxt != "")
      contentPara.parents("div").next("div").contains(secondDivTxt);
  }

  //to get object Privacydata
  function getObjectData(dataType, ParaNum) {
    var objArray;
    var objCx;
    var returnObjCx = [];
    switch (dataType) {
      case "paraPolicyCx":
        objArray = PrivacyPolicyContent.paraPolicyCx;
        break;
      case "paraPolicyCxWithOrdList":
        objArray = PrivacyPolicyContent.paraPolicyCxWithOrdList;
        break;

      case "paraPolicyCxOrdListWthnOrdList":
        objArray = PrivacyPolicyContent.paraPolicyCxOrdListWthnOrdList;
        break;
      case "paraPolicyCxDiffTyp1":
        objArray = PrivacyPolicyContent.paraPolicyCxDiffTyp1;
        break;
      case "paraPolicyCxDiffTyp2":
        objArray = PrivacyPolicyContent.paraPolicyCxDiffTyp2;
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
