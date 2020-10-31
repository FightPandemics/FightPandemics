import HelpBoard from "../../../elements/pages/helpBoard";
import Post from "../../../elements/pages/post";

describe("FightPandemics Post for unauthorized user", () => {
  const helpBoard = new HelpBoard();
  const post = new Post();
  const shareViaModalWindowTitle = "Share via...";

  context("User opens Help Board", () => {
    beforeEach(() => {
      helpBoard.visit();
    });

    it("Unauthorized user is redirected to SignIn page when clicking on Like button", () => {
      cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(
        ($firstPost) => {
          cy.get(post.getLikeButtonSelector()).click();
          cy.validateCorrectScreenIsOpen("auth/login");
        },
      );
    });

    it("Unauthorized user is redirected to SignIn page when clicking on Comment button", () => {
      cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(
        ($firstPost) => {
          cy.get(post.getCommentButtonSelector()).click();
          cy.validateCorrectScreenIsOpen("auth/login");
        },
      );
    });

    it("Unauthorized user can see tags", () => {
      cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(
        ($firstPost) => {
          post
            .getPostTags()
            .children()
            .should(($tags) => {
              expect($tags).to.have.attr("class").contains("am-tag-disabled");
              expect($tags.children())
                .to.have.attr("class")
                .contains("am-tag-text");
            });
        },
      );
    });

    it("Unauthorized user can't click on text and see post details", () => {
      cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(
        ($firstPost) => {
          post.getPostPageLink().should("have.attr", "style", "display: none;");
        },
      );
    });

    it("Unauthorized user can see a Share via... modal window", () => {
      cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(
        ($firstPost) => {
          post.getShareButton().click();
        },
      );
      cy.get(post.getModalWindowShareViaSelector()).within(($modalWindow) => {
        var modalWindowTitle = post.getModalWindowShareViaH4Title();
        modalWindowTitle
          .should("be.visible")
          .contains(shareViaModalWindowTitle);
        validateSocialMediaShareButton(
          post.getModalWindowEmailButton(),
          "aria-label",
          "email",
        );
        validateSocialMediaShareButton(
          post.getModalWindowFacebookButton(),
          "aria-label",
          "facebook",
        );
        validateSocialMediaShareButton(
          post.getModalWindowLinkedinButton(),
          "aria-label",
          "linkedin",
        );
        validateSocialMediaShareButton(
          post.getModalWindowRedditButton(),
          "aria-label",
          "reddit",
        );
        validateSocialMediaShareButton(
          post.getModalWindowTelegramButton(),
          "aria-label",
          "telegram",
        );
        validateSocialMediaShareButton(
          post.getModalWindowTwitterButton(),
          "aria-label",
          "twitter",
        );
        validateSocialMediaShareButton(
          post.getModalWindowWhatsappButton(),
          "aria-label",
          "whatsapp",
        );

        var sharingPostLink = post.getModalWindowSharingUrlInput();
        sharingPostLink.should("have.attr", "value").and("contain", "/post/");

        var closeModalWindowButton = post.getModalWindowCloseButton();
        closeModalWindowButton.should("be.visible").click();

        post.getModalWindowShareVia().should("not.exist");
      });
    });

    it("Unauthorized user can click on a post header and is redirected to the post's author screen", () => {
      cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(
        ($firstPost) => {
          post
            .getPostAuthorUrl()
            .invoke("attr", "href")
            .then((value) => {
              post.getPostHeader().click();
              cy.validateCorrectScreenIsOpen(value);
            });
        },
      );
    });

    function validateSocialMediaShareButton(getMethod, attr, socialMedia) {
      getMethod.should("have.attr", attr, socialMedia).and("be.visible");
    }
  });
});
