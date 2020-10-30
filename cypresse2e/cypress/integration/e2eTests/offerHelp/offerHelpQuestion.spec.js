import OfferHelpQuestionPage from '../../../elements/pages/offerHelpQuestionPage'
import inputValues from '../../../fixtures/inputValues.json'

describe('Fight Pandemics Offer Help Questionnaire', () => {
  const offerHelpQuestion = new OfferHelpQuestionPage()

  context('User goes to offer help question one page', () => {
    beforeEach(() => {
      offerHelpQuestion.visitOfferHelpOne()
    })

    it('Offer Help Question One page contains heading & question one', () => {
      var questionNumberOne = 'Question 1/2'
      var questionOne = 'How do you want to contribute?'
      offerHelpQuestion
        .getQuestionNumberOne()
        .should('be.visible')
        .contains(questionNumberOne)
      offerHelpQuestion
        .getQuestionOne()
        .should('be.visible')
        .contains(questionOne)
    })

    it('Offer Help Question One page contains answer options & checkboxes to select option/options for question one', () => {
      var checkboxOptionOne = 'As a Volunteer'
      var checkboxOptionTwo = 'As a Donor/Investor'
      var checkboxOptionThree = 'As an Organization'
      offerHelpQuestion
        .getCheckboxOptionOne()
        .should('be.visible')
        .contains(checkboxOptionOne)
      offerHelpQuestion
        .getCheckboxOptionTwo()
        .should('be.visible')
        .contains(checkboxOptionTwo)
      offerHelpQuestion
        .getCheckboxOptionThree()
        .should('be.visible')
        .contains(checkboxOptionThree)
      offerHelpQuestion
        .getCheckboxOne()
        .should('be.visible')
        .check({ force: true })
        .should('be.checked')
      offerHelpQuestion
        .getCheckboxTwo()
        .should('be.visible')
        .check({ force: true })
        .should('be.checked')
      offerHelpQuestion
        .getCheckboxThree()
        .should('be.visible')
        .check({ force: true })
        .should('be.checked')
    })

    it('Offer Help Question One Back Button is visible and clickable', () => {
      var backButton = offerHelpQuestion.getBackButtonOne()
      backButton.should('be.visible').click()
    })

    it('Offer Help Question One Next Button is visible and clickable and Offer Help Question Two Page loads successfully', () => {
      var nextButton = offerHelpQuestion.getNextButtonOne()
      nextButton.should('be.visible').click()
    })
  })

  context('User goes to offer help question 2', () => {
    beforeEach(() => {
      offerHelpQuestion.visitOfferHelpTwo()
    })

    it('Offer Help Question Two Page contains heading & question two', () => {
      var questionNumberTwo = 'Question 2/2'
      var questionTwo = 'Where are you located?'
      var infoText = 'We want to show you the most relevant results'
      offerHelpQuestion
        .getQuestionNumberTwo()
        .should('be.visible')
        .contains(questionNumberTwo)
      offerHelpQuestion
        .getQuestionTwo()
        .should('be.visible')
        .contains(questionTwo)
      offerHelpQuestion.getInfoText().should('be.visible').contains(infoText)
    })

    it('Offer Help Question Two Page - location can be typed and see list of locations', () => {
      var locationInputLine = offerHelpQuestion.getLocationInputLine()
      locationInputLine.should('be.visible').click({ force: true })
      locationInputLine.type(inputValues.location)
      offerHelpQuestion.getLocationDropdown().should('be.visible')
    })

    it('Offer Help Question Two Page - location input line Information is visible', () => {
      var locationInputInfo = 'Enter address, zip code, or city'
      offerHelpQuestion.getLocationInputInfo().should('be.visible')
      offerHelpQuestion.getLocationInputInfo().contains(locationInputInfo)
    })

    it('Offer Help Question Two Page - Share My Location Icon and Text is visible and clickable', () => {
      var shareMyLocationText = 'Share My Location'
      var shareMyLocationIcon = offerHelpQuestion.getShareMyLocationIcon()
      shareMyLocationIcon.should('be.visible').click({ force: true })
      offerHelpQuestion
        .getShareMyLocationText()
        .should('be.visible')
        .contains(shareMyLocationText)
        .click({ force: true })
    })

    it('Offer Help Question Two Page - Show Postings Link is visible and clickable', () => {
      var showMePostLink = 'Show me postings from anywhere'
      offerHelpQuestion
        .getShowMePostLink()
        .should('be.visible')
        .contains(showMePostLink)
        .click({ force: true })
    })

    it('Offer Help Question Two Back Button is visible and clickable', () => {
      var backButton = offerHelpQuestion.getBackButtonTwo()
      backButton.should('be.visible').click()
    })
  })
})
