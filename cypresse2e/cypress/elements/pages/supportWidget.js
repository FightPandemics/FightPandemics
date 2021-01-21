class SupportWidget {
  widgetButton = "#launcher";
  widgetWindow = "#webWidget";
  h1Heading = "h1";
  h2Heading = "h2";
  reportBugLink = "div ul li:nth-child(1) button";
  volunteerLink = "div ul li:nth-child(2) button";
  deleteLink = "div ul li:nth-child(3) button";
  otherLink = "div ul li:nth-child(4) button";
  nameInput = "form div div:nth-child(1)";
  emailInput = "form div div:nth-child(2)";
  subjectInput = "form div div:nth-child(3)";
  descriptionInput = "form div div:nth-child(4)";
  attachments = "form div div:nth-child(5)";
  sendButton = "footer div button";

  constructor() {}

  visit() {
    cy.visit("");
  }
}

export default SupportWidget;
