class PrivacyPolicy {
  privacyPolicyH2 = '//*[@id="root"]/div/div/div[3]/main/div/div/h2';
  policyContent = ".am-drawer-content main div div";
  firstParaLoc = '//*[@id="root"]/div/div/div[3]/main/div/div/div[1]';
  secondParaLoc = '//*[@id="root"]/div/div/div[3]/main/div/div/div[2]';
  thirdParaLoc = '//*[@id="root"]/div/div/div[3]/main/div/div/div[3]';
  fourthParaLoc = '//*[@id="root"]/div/div/div[3]/main/div/div/div[4]';
  dateDocumented = '//*[@id="root"]/div/div/div[3]/main/div/div/div[5]';
  firstParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[1]';
  secondParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[2]';
  thirdParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[3]';
  fourthParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[4]';
  fifthParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[5]';
  sixthParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[6]';
  seventhParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[7]';
  eightParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[8]';
  ninethParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[9]';
  tenthParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[10]';
  eleventhParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[11]';
  twelveParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[12]';
  thirteenParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[13]';
  fourthteenParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[14]';
  fifthteenParaLocWithOrdList =
    '//*[@id="root"]/div/div/div[3]/main/div/div/ol/li[15]';

  legalEmail = "legal@fightpandemics.com";
  legalEmailRef = "mailto:legal@fightpandemics.com";

  constructor() {}

  visit() {
    cy.visit("privacy-policy");
  }

  getPrivacyPolicyH2() {
    return cy.xpath(this.privacyPolicyH2);
  }

  getPolicyContent() {
    return cy.get(this.policyContent);
  }

  getLocationPara(ParaNumber) {
    switch (ParaNumber) {
      case 1:
        return cy.xpath(this.firstParaLoc);
      case 2:
        return cy.xpath(this.secondParaLoc);
      case 3:
        return cy.xpath(this.thirdParaLoc);
      case 4:
        return cy.xpath(this.fourthParaLoc);
      case 11:
        console.log(ParaNumber);
        return cy.xpath(this.firstParaLocWithOrdList);
      case 12:
        return cy.xpath(this.secondParaLocWithOrdList);
      case 13:
        console.log(ParaNumber);
        return cy.xpath(this.thirdParaLocWithOrdList);
      case 14:
        return cy.xpath(this.fourthParaLocWithOrdList);
      case 15:
        return cy.xpath(this.fifthParaLocWithOrdList);
      case 16:
        return cy.xpath(this.sixthParaLocWithOrdList);
      case 17:
        return cy.xpath(this.seventhParaLocWithOrdList);
      case 18:
        console.log(ParaNumber);
        return cy.xpath(this.eightParaLocWithOrdList);
      case 19:
        return cy.xpath(this.ninethParaLocWithOrdList);
      case 110:
        return cy.xpath(this.tenthParaLocWithOrdList);
      case 111:
        return cy.xpath(this.eleventhParaLocWithOrdList);
      case 112:
        return cy.xpath(this.twelveParaLocWithOrdList);
      case 113:
        return cy.xpath(this.thirteenParaLocWithOrdList);
      case 114:
        console.log(ParaNumber);
        return cy.xpath(this.fourthteenParaLocWithOrdList);
      case 115:
        return cy.xpath(this.fifthteenParaLocWithOrdList);
      default:
        break;
    }
    return cy.xpath(this.firstParaLoc);
  }

  getDateDocumented() {
    return cy.xpath(this.dateDocumented);
  }
}
export default PrivacyPolicy;
