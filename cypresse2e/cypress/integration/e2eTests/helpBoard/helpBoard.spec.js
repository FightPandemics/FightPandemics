import HelpBoard from "../../../elements/pages/helpBoard";
import Logo from "../../../elements/pages/fpLogo";
import inputValues from "../../../fixtures/inputValues.json";
import errorMessages from "../../../fixtures/errorMessages.json";

describe("FightPandemics Help Board Page for unauthorized user", () => {
  const helpBoard = new HelpBoard();
  const logo = new Logo();
  var authorTitleText = "Sourced by";

  context("User opens Help Board", () => {
    beforeEach(() => {
      helpBoard.visit();
    });

    it("FP logo is visible and clickable", () => {
      cy.checkFpLogoIsVisibleAndClickable(logo.getFpLogoLocator());
    });

    it("Unauthorized user is redirected to SignIn page when clicking Add Post Button", () => {
      helpBoard.getAddPostButton().click({ force: true });
      cy.validateCorrectScreenIsOpen("auth/login");
    });

    it("keyword search container is visible and clickable", () => {
      helpBoard.getSearchContainerDiv().should("be.visible").click();
    });
    it(" clicking on search container, searchbox for typing opens", () => {
      searchInputForPosts();
    });

    it("cancel button 'x' in search is visible and clickable", () => {
      searchInputForPosts().type(inputValues.searchByRandomText + "{enter}");
      helpBoard
        .getSearchCancelButton()
        .should("be.visible")
        .click({ force: true });
    });
    it("Unauthorized user can search posts by typing name of an user", () => {
      searchInputForPosts().type(inputValues.searchByName + "{enter}");
      helpBoard.getAuthorTitle().should("be.visible").contains(authorTitleText);
    });

    it("Unauthorized user if type single character for search", () => {
      searchInputForPosts().type(
        inputValues.searchBySingleCharacter + "{enter}",
      );
      helpBoard
        .getErrorMessage()
        .should("be.visible")
        .contains("small", errorMessages.errorMessageTextInSearch);
    });
    it("No post appear if unauthorized user search posts by typing misspelled name", () => {
      searchInputForPosts().type(
        inputValues.searchByMisspelledText + "{enter}",
      );
      helpBoard.getAddPostLinkElement();
      helpBoard
        .getNoPostsAvailableTextElement()
        .contains(errorMessages.noPostsAvailableText);
    });

    it("Help Board is empty - Unauthorized user is redirected to SignIn page when clicking Add Post link", () => {
      //there is no post on the Help Board
      searchInputForPosts().type(
        inputValues.searchByMisspelledText + "{enter}",
      );
      helpBoard
        .getNoPostsAvailableTextElement()
        .contains(errorMessages.noPostsAvailableText);
      var addPostLink = helpBoard.getAddPostLinkElement();
      addPostLink.click({ force: true });
      cy.validateCorrectScreenIsOpen("auth/login");
    });
  });

  function searchInputForPosts() {
    helpBoard.getSearchContainerDiv().click();
    var searchInput = helpBoard.getKeywordSearchInput();
    searchInput.should("be.visible").and("have.attr", "type", "text");
    return searchInput;
  }
});
