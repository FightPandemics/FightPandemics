import AboutUs from '../../../elements/pages/aboutUs'


describe('FightPandemics About Us page', () => {
  const aboutUs = new AboutUs()

  context('User opens About Us Page', () => {
    beforeEach(() => {
      cy.visit('/about-us')
    })

    it('Check if the social media buttons are visible and get us to the appropriate link', () => {
      linkedInButtonIsVisibleAndPointToAppropriateLink()
      facebookButtonIsVisibleAndPointToAppropriateLink()
      instagramButtonIsVisibleAndPointToAppropriateLink()
      twitterButtonIsVisibleAndPointToAppropriateLink()
    })

    it('Check if Get Involved modal windows sub-buttons are visible and get us to the appropriate link', () => {
      clickOnGetInvolvedButton()
      joinAsVolunteerIsVisibleAndPointToAppropriateLink()
      joinAsAmbassadorIsVisibleAndPointToAppropriateLink()
      joinStudentProgramIsVisibleAndPointToAppropriateLink()
    })

    it('Check if Go to Help Board button visible and get us to the appropriate link', () => {
      goToHelpBoardButtonIsVisibleAndPointToAppropriateLink()
    })
  })

  //the following functions are for make the code more readable and maintainable, and to avoid code duplications

  function linkedInButtonIsVisibleAndPointToAppropriateLink() {
    cy.checkAnyKindOfLinks(aboutUs.linkedInButton, aboutUs.linkedInLink)
  }

  function facebookButtonIsVisibleAndPointToAppropriateLink() {
    cy.checkAnyKindOfLinks(aboutUs.facebookButton, aboutUs.facebookLink)
  }

  function instagramButtonIsVisibleAndPointToAppropriateLink() {
    cy.checkAnyKindOfLinks(aboutUs.instagramButton, aboutUs.instagramLink)
  }

  function twitterButtonIsVisibleAndPointToAppropriateLink() {
    cy.checkAnyKindOfLinks(aboutUs.twitterButton, aboutUs.twitterLink)
  }

  function clickOnGetInvolvedButton() {
    cy.get(aboutUs.getInvolvedButton).click()
  }

  function joinAsVolunteerIsVisibleAndPointToAppropriateLink() {
    cy.checkAnyKindOfLinks(aboutUs.joinAsVolunteerButton, aboutUs.joinAsVolunteerLink)
  }

  function joinAsAmbassadorIsVisibleAndPointToAppropriateLink() {
    cy.checkAnyKindOfLinks(aboutUs.joinAsAmbassadorButton, aboutUs.joinAsAmbassadorLink)
  }

  function joinStudentProgramIsVisibleAndPointToAppropriateLink() {
    cy.checkAnyKindOfLinks(aboutUs.joinStudentProgramButton, aboutUs.joinStudentProgramLink)
  }

  function goToHelpBoardButtonIsVisibleAndPointToAppropriateLink() {
    cy.checkAnyKindOfLinks(aboutUs.getToHelpBoardButton, aboutUs.goToHelpBoardLink)
  }


})
