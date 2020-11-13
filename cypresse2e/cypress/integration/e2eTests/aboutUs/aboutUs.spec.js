import AboutUs from '../../../elements/pages/aboutUs'


describe('Fight Pandemics About Us page', () => {
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
    checkAnyKindOfLinks(aboutUs.linkedInButton, aboutUs.linkedInLink)
  }

  function facebookButtonIsVisibleAndPointToAppropriateLink() {
    checkAnyKindOfLinks(aboutUs.facebookButton, aboutUs.facebookLink)
  }

  function instagramButtonIsVisibleAndPointToAppropriateLink() {
    checkAnyKindOfLinks(aboutUs.instagramButton, aboutUs.instagramLink)
  }

  function twitterButtonIsVisibleAndPointToAppropriateLink() {
    checkAnyKindOfLinks(aboutUs.twitterButton, aboutUs.twitterLink)
  }

  function clickOnGetInvolvedButton (){
    cy.get(aboutUs.getInvolvedButton).click()
  }

  function joinAsVolunteerIsVisibleAndPointToAppropriateLink() {
    checkAnyKindOfLinks(aboutUs.joinAsVolunteerButton,aboutUs.joinAsVolunteerLink)
  }

  function joinAsAmbassadorIsVisibleAndPointToAppropriateLink() {
    checkAnyKindOfLinks(aboutUs.joinAsAmbassadorButton,aboutUs.joinAsAmbassadorLink)
  }

  function joinStudentProgramIsVisibleAndPointToAppropriateLink() {
    checkAnyKindOfLinks(aboutUs.joinStudentProgramButton,aboutUs.joinStudentProgramLink)
  }

  function goToHelpBoardButtonIsVisibleAndPointToAppropriateLink() {
      checkAnyKindOfLinks(aboutUs.getToHelpBoardButton,aboutUs.goToHElpBoardLink)
  }

  
  function checkAnyKindOfLinks(button, link) {
    cy.get(button)
      .should('be.visible')
      .and('have.attr', 'href', link)
  }


})
