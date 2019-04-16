import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToProbleme() {
    // return browser.get(browser.baseUrl) as Promise<any>; //retourner la route des tests qu'on souheire faire
    return browser.get('/probleme') as Promise<any>;
  }

  getProblemeTitle() {
    return element(by.css('Inter-root p')).getText() as Promise<string>;
  }

  getProblemeValiderButton(){
    return element(by.buttonText('Sauvegarder')).isEnabled();
  }

  getElementById(elementId){
    return element(by.id(elementId));
  }

  obtenirClasseZoneDescriptionProbleme(){
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  }

  setChampsValidesScenarioNominal(): void {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('typeProblemeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('nePasNotifierID')).click();
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  setChampsValidesScenarioAlternatifParMessageTexte(): void {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('typeProblemeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('parMessageTexteID')).click();
    element(by.id('telephoneId')).sendKeys('5141231234');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  setChampsValidesScenarioAlternatifParCourriel(): void {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('typeProblemeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('parCourrielID')).click();
    element(by.id('courrielID')).sendKeys('aa@bbb.com');
    element(by.id('courrielConfirmationId')).sendKeys('aa@bbb.com');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  setZoneDescriptionProblemeCaracteresSuffisants(): void{
    element(by.id('descriptionProblemeId')).sendKeys('XXXXX');
  }

  setZoneDescriptionProblemeCaracteresInsuffisants(): void{
    element(by.id('descriptionProblemeId')).sendKeys('XXXX');
  }
}
