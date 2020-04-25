import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CategorieProbleme } from './probleme-data';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[CategorieProbleme]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('champ prénom du problème doit comporter au moins 2 caractères' , () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  })
  it('champ prénom du problème doit etre valide avec 3 caracteres' , () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3))
    expect(zone.valid).toBeTruthy();
  })
  it('champ prénom du problème doit etre valide avec 200 caracteres' , () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200))
    expect(zone.valid).toBeTruthy();
  })
  it('champ prénom du problème doit comporter au moins 2 caractères' , () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' ')
    expect(zone.valid).toBeFalsy();
  })
  it('champ prénom du problème doit etre valide avec 10 espaces' , () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10))
    expect(zone.valid).toBeTruthy();
  })
  it('champ prénom du problème doit etre valide avec 2 espaces et caracteres' , () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('  a')
    expect(zone.valid).toBeTruthy();
  })

  it('zone courriel, telephone et confirmation courriel désactivé si ne pas notifier ' , () =>{
      component.gestionNotification('nePasNotifier');
      let testCourrielGroup = component.problemeForm.get('courrielGroup');
      let testCourriel = component.problemeForm.get('courrielGroup.courriel');
      let testCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
      let testMessagerieTexte = component.problemeForm.get('telephone');
      expect(
        testCourrielGroup.status === 'DISABLED' && 
        testCourriel.status === 'DISABLED' && 
        testCourrielConfirmation.status === 'DISABLED' &&
        testMessagerieTexte.status === 'DISABLED'
        ).toBe(true);
  })

  it('zone courrielGroup, couriel et courriel confirmation activer si notification est par courriel' , () =>{
    component.gestionNotification('parCourriel');
    let notif = component.problemeForm.controls['typeNotification'];
    notif.setValue('parCourriel');
    let testCourrielGroup = component.problemeForm.get('courrielGroup');
    let testCourriel = component.problemeForm.get('courrielGroup.courriel');
    let testCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let testMessagerieTexte = component.problemeForm.get('telephone');
    expect(
      (testCourrielGroup.status === 'INVALID') && 
      (testCourriel.status === 'INVALID') && 
      (testCourrielConfirmation.status === 'INVALID') &&
      (testMessagerieTexte.status === 'DISABLED')
      ).toBe(true);
  })

  it('zone telephone active si notification par message texte' , () =>{
    component.gestionNotification('parMessageTexte');
    let testCourrielGroup = component.problemeForm.get('courrielGroup');
    let testCourriel = component.problemeForm.get('courrielGroup.courriel');
    let testCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let testMessagerieTexte = component.problemeForm.get('telephone');
    expect(
      testCourrielGroup.status === 'DISABLED' && 
      testCourriel.status === 'DISABLED' && 
      testCourrielConfirmation.status === 'DISABLED' &&
      testMessagerieTexte.status !== 'DISABLED'
      ).toBe(true);
  })

  it('zone telephone active si notification par message texte' , () =>{
    component.gestionNotification('parMessageTexte');
    let testCourrielGroup = component.problemeForm.get('courrielGroup');
    let testCourriel = component.problemeForm.get('courrielGroup.courriel');
    let testCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let testMessagerieTexte = component.problemeForm.get('telephone');
    expect(
      testCourrielGroup.status === 'DISABLED' && 
      testCourriel.status === 'DISABLED' && 
      testCourrielConfirmation.status === 'DISABLED' &&
      testMessagerieTexte.status !== 'DISABLED'
      ).toBe(true);
  })

  it(' Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel ' , () =>{
    component.gestionNotification('parCourriel');
    let errors = {};
    let testCourriel = component.problemeForm.get('courrielGroup.courriel');
    let testCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let testMessagerieTexte = component.problemeForm.get('telephone');
    
    
    let testCourrielGroup = component.problemeForm.get('courrielGroup');
    
    testCourriel.setValue("vincent@live.ca");
    testCourrielConfirmation.setValue("vincentboutot@live.ca");
    errors = testCourrielGroup.errors || {};
    expect(errors['CourrielsDifferents']).toBeTruthy();
  })

  it(' Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valide si les valeurs sont pareils quand notifier par courriel ' , () =>{
    component.gestionNotification('parCourriel');
    let errors = {};
    let testCourriel = component.problemeForm.get('courrielGroup.courriel');
    let testCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let testMessagerieTexte = component.problemeForm.get('telephone');
    
    
    let testCourrielGroup = component.problemeForm.get('courrielGroup');
    
    testCourriel.setValue("vincent@live.ca");
    testCourrielConfirmation.setValue("vincent@live.ca");
    errors = testCourrielGroup.errors || {};
    expect(errors['CourrielsDifferents']).toBeUndefined();
  })

  it(' Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte ' , () =>{
    component.gestionNotification('parMessageTexte');
    let errors = {};
    let testCourriel = component.problemeForm.get('courrielGroup.courriel');
    let testCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let testMessagerieTexte = component.problemeForm.get('telephone');
    
    
    let testCourrielGroup = component.problemeForm.get('courrielGroup');
    
    testMessagerieTexte.setValue("atbs");
    errors = testMessagerieTexte.errors || {};
    console.trace(errors);
    expect(testMessagerieTexte.status === "VALID").toBeFalsy();
  })

  it('  Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte  ' , () =>{
    component.gestionNotification('parMessageTexte');
    let errors = {};
    let testCourriel = component.problemeForm.get('courrielGroup.courriel');
    let testCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let testMessagerieTexte = component.problemeForm.get('telephone');
    
    
    let testCourrielGroup = component.problemeForm.get('courrielGroup');
    
    testMessagerieTexte.setValue("111111111");
    errors = testMessagerieTexte.errors || {};
    console.trace(errors);
    expect(testMessagerieTexte.status === "VALID").toBeFalsy();
  })

  it(' Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte' , () =>{
    component.gestionNotification('parMessageTexte');
    let errors = {};
    let testCourriel = component.problemeForm.get('courrielGroup.courriel');
    let testCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let testMessagerieTexte = component.problemeForm.get('telephone');
    
    
    let testCourrielGroup = component.problemeForm.get('courrielGroup');
    
    testMessagerieTexte.setValue("1111111111");
    errors = testMessagerieTexte.errors || {};
    console.trace(errors);
    expect(testMessagerieTexte.status === "VALID").toBeTruthy();
  })

  it('  Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte ' , () =>{
    component.gestionNotification('parMessageTexte');
    let errors = {};
    let testCourriel = component.problemeForm.get('courrielGroup.courriel');
    let testCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let testMessagerieTexte = component.problemeForm.get('telephone');    
    
    let testCourrielGroup = component.problemeForm.get('courrielGroup');
    
    testMessagerieTexte.setValue("");
    errors = testMessagerieTexte.errors || {};
    console.trace(errors);
    expect(testMessagerieTexte.status === "VALID").toBeFalsy();
  })

});
