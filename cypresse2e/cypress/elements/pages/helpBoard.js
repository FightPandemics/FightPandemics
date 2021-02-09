class HelpBoard {
  addPostButton = "img#HB_CP";
  noPostsAvailableTextElement = '//*/a[@id="HB_CP"]//parent::div';
  addPostLink = "a#HB_CP";
  firstPostOnHelpBoard =
    "div.feed-posts > div:nth-child(1) > div > div > div:nth-child(1)";
  helpBoard = "div.feed-posts";
  // keywordSearchButton = "#SearchContainer > div > img:nth-child(1)";
  searchContainerDiv = "div[role='button'] span#SearchContainer ";
  keywordSearchInput = "div[role='button'] input#SCH_IN";
  searchCancelButton = "#SearchContainer > div > img:nth-child(3)";
  authorTitle = "div.title-wrapper span.author";
  errorMessage = "#SearchContainer > small";

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

  getSearchContainerDiv() {
    return cy.get(this.searchContainerDiv);
  }

  getKeywordSearchInput() {
    return cy.get(this.keywordSearchInput);
  }

  getSearchCancelButton() {
    return cy.get(this.searchCancelButton);
  }

  getAuthorTitle() {
    return cy.get(this.authorTitle);
  }

  getErrorMessage() {
    return cy.get(this.errorMessage);
  }
}

export default HelpBoard;
