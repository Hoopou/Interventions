import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Doit afficher le titre du formulaire Declarer un probleme ', () => {
    page.navigateToProbleme();
    expect(page.getProblemeTitle()).toEqual('Déclarer un problème');
  });

  it('Doit activer le bouton Sauvegarder avec champs valides scénario nominal ', () => {
    page.navigateToProbleme();
    page.setChampsValidesScenarioNominal();
    expect(page.getProblemeValiderButton()).toBeTruthy();
  });

  it('Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message TEXTE ', () => {
    page.navigateToProbleme();
    page.setChampsValidesScenarioAlternatifParMessageTexte();
    expect(page.getProblemeValiderButton()).toBeTruthy();
  });

  it('Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par courriel', () => {
    page.navigateToProbleme();
    page.setChampsValidesScenarioAlternatifParCourriel();
    expect(page.getProblemeValiderButton()).toBeTruthy();
  });

  it('Zone DESCRIPTION DU PROBLÈME a une bordure VERTE si nombre de caractères suffisant', () => {
    page.navigateToProbleme();
    page.setZoneDescriptionProblemeCaracteresSuffisants();
    expect(page.obtenirClasseZoneDescriptionProbleme()).toContain('is-valid');
  });

  it('Zone DESCRIPTION DU PROBLÈME a une bordure ROUGE si nombre de caractères insuffisant', () => {
    page.navigateToProbleme();
    page.setZoneDescriptionProblemeCaracteresInsuffisants();
    expect(page.obtenirClasseZoneDescriptionProbleme()).toContain('is-invalid');
  });
});
