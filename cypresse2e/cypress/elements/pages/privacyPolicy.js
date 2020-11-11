class privacyPolicy {
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
  all_emails = "ol >li a href";

  constructor() {}

  visit() {
    cy.visit("privacy-policy");
  }

  getAllEmails() {
    return cy.get(this.all_emails);
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
      default:
        break;
    }
    return cy.xpath(this.firstParaLoc);
  }
  getLocationParaWithOrdList(ParaNumber) {
    switch (ParaNumber) {
      case 1:
        return cy.xpath(this.firstParaLocWithOrdList);
      case 2:
        return cy.xpath(this.secondParaLocWithOrdList);
      case 3:
        return cy.xpath(this.thirdParaLocWithOrdList);
      case 4:
        return cy.xpath(this.fourthParaLocWithOrdList);
      case 5:
        return cy.xpath(this.fifthParaLocWithOrdList);
      case 6:
        return cy.xpath(this.sixthParaLocWithOrdList);
      case 7:
        return cy.xpath(this.seventhParaLocWithOrdList);
      case 8:
        return cy.xpath(this.eightParaLocWithOrdList);
      case 9:
        return cy.xpath(this.ninethParaLocWithOrdList);
      case 10:
        return cy.xpath(this.tenthParaLocWithOrdList);
      case 11:
        return cy.xpath(this.eleventhParaLocWithOrdList);
      case 12:
        return cy.xpath(this.twelveParaLocWithOrdList);
      case 13:
        return cy.xpath(this.thirteenParaLocWithOrdList);
      case 14:
        return cy.xpath(this.fourthteenParaLocWithOrdList);
      case 15:
        return cy.xpath(this.fifthteenParaLocWithOrdList);
      default:
        break;
    }
    return cy.xpath(this.firstParaLocWithOrdList);
  }
  getDateDocumented() {
    return cy.xpath(this.dateDocumented);
  }
}
export default privacyPolicy;
