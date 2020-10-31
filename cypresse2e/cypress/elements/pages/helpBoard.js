class HelpBoard {
  addPostButton = "button > img#HB_CP";
  noPostsAvailableTextElement = '//*/a[@id="HB_CP"]//parent::div';
  addPostLink = "a#HB_CP";
  firstPostOnHelpBoard =
    "div.feed-posts > div:nth-child(1) > div > div > div:nth-child(1)";
  helpBoard = "div.feed-posts";

  constructor() {}

  visit() {
    cy.visit("feed");
  }

  getAddPostButton() {
    return cy.get(this.addPostButton);
  }

  getNoPostsAvailableDiv() {
    return this.noPostsAvailableTextElement;
  }

  getAddPostLink() {
    return this.addPostLink;
  }

  getAddPostLinkElement() {
    return cy.get(this.addPostLink);
  }

  getNoPostsAvailableTextElement() {
    return cy.xpath(this.noPostsAvailableTextElement);
  }

  getFirstPostOnHelpBoard() {
    return cy.get(this.getFirstPostOnHelpBoard);
  }

  getFirstPostOnHelpBoardSelector() {
    return this.firstPostOnHelpBoard;
  }

  getHelpBoardSelector() {
    return this.helpBoard;
  }
}

export default HelpBoard;
