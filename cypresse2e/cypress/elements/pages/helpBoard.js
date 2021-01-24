class HelpBoard {
  addPostButton = "img#HB_CP";
  noPostsAvailableTextElement = '//*/a[@id="HB_CP"]//parent::div';
  addPostLink = "a#HB_CP";
  firstPostOnHelpBoard =
    "div.feed-posts > div:nth-child(1) > div > div > div:nth-child(1)";
  helpBoard = "div.feed-posts";
  keywordSearchButton = "#SearchContainer > div > img";
  keywordSearchLink = "#SCH_IN";
  authorTitle = "div.title-wrapper";

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

  getKeywordSearchButton() {
    return this.keywordSearchButton;
  }

  getKeywordSearchLink() {
    return this.keywordSearchLink;
  }

  getAuthorTitle() {
    return this.authorTitle;
  }
}

export default HelpBoard;
