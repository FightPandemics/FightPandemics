import HomePage from '../../../elements/pages/homePage';

describe('FightPandemics Home screen', () => {

  var h1HeadingText = "A place to offer and request help";
  var subHeading1Text = "Pandemics will continue to happen.";
  var subHeading2Text = "We help communities prepare and respond.";
  var requestHelpButtonText = 'Request Help'
  var offerHelpButtonText = 'Offer Help'

  const home = new HomePage();

    context('User opens Home screen ', () => {
        beforeEach(() => {
          home.visit();
          });
  
      it('Home screen contains headings', () => {
        home.getH1Heading().contains(h1HeadingText);
        home.getSubHeading1().contains(subHeading1Text);
        home.getSubHeading2().contains(subHeading2Text);
      });

      it('Link to Help Board screen - View Help Board is visible', () => {
        var linkToHelpBoard = home.getViewHelpBoardLink();
        linkToHelpBoard.should('be.visible')
        linkToHelpBoard.contains('a p', 'View Help Board')
      });
    

      it('Buttons Request Help and Offer help are visible', () => {
        var requestHelpButton = home.getRequestHelpButton();
        requestHelpButton.should('be.visible');
        requestHelpButton.find('img').should('have.attr', 'alt',requestHelpButtonText);
        var offerHelpButton = home.getOfferHelpButton();
        offerHelpButton.should('be.visible');
        offerHelpButton.find('img').should('have.attr', 'alt', offerHelpButtonText);     
      });
    });
})