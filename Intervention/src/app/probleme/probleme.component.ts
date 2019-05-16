import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ZonesValidator } from '../shared/longeur-minimum/longeur-minimum.component';
import { ICategorie } from './categorie';
import { CategorieService } from './categorie.service';
import { emailMatcherValidator} from '../shared/courrielValidation/courrielValidation.component';
import { IProbleme } from './probleme';
import { ProblemeService} from './probleme.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'stk-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  categoriesProbleme: ICategorie[];
  errorMessage: string;

  probleme: IProbleme;
  messageSauvegarde: string;

  constructor(private fb: FormBuilder, private categories: CategorieService, private problemeService: ProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['', [ZonesValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [ZonesValidator.longueurMaximum(50), Validators.required]],
      typeProbleme: [''],
      typeNotification: ['nePasNotifier'],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }),
      telephone: [{ value: '', disabled: true }],
      isFormulaireValide: [{ value: false, disable: true }],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: { value: Date(), disabled: true } 
    });

    this.categories.obtenirCategories()
      .subscribe(cat => this.categoriesProbleme = cat,
        error => this.errorMessage = <any>error);

    this.problemeForm.get('typeNotification').valueChanges.subscribe(value => this.gestionNotification(value));

    this.problemeForm.valueChanges.subscribe(value => this.gestionValidationFormulaire())
  }

  gestionValidationFormulaire(): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel').errors === null;
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation').errors === null;
    const courrielGroupControl = this.problemeForm.get('courrielGroup').errors === null;
    const telephoneControl = this.problemeForm.get('telephone').errors === null;
    const nomControl = this.problemeForm.get('nom').errors === null;
    const prenomControl = this.problemeForm.get('prenom').errors === null;
    const formulaireValideControl = this.problemeForm.get('isFormulaireValide');

    if(courrielControl && courrielConfirmationControl && courrielGroupControl && telephoneControl && nomControl && prenomControl){
      formulaireValideControl.enable();
    }else{
      formulaireValideControl.disable();
    }

  }

  gestionNotification(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const telephoneControl = this.problemeForm.get('telephone');

    // Tous remettre à zéro
    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();

    courrielGroupControl.clearValidators();
    courrielGroupControl.reset();
    courrielGroupControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();
    
    if (typeNotification === 'nePasNotifier') {

    }
    else {
      if (typeNotification === 'parCourriel') {
        courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);               
        courrielGroupControl.enable();  
        courrielControl.setValidators([Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'), Validators.required]);      
        courrielControl.enable();  
        courrielConfirmationControl.setValidators([Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'), Validators.required]);              
        courrielConfirmationControl.enable();  
        // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
        // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
        
      }else
        if(typeNotification === 'parMessageTexte'){
          telephoneControl.setValidators([Validators.required, Validators.minLength(10) , Validators.maxLength(10), Validators.pattern('[0-9]+')]);
          telephoneControl.enable();
          // telephoneControl.setValidators([]);
        }
    }
    courrielGroupControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }

  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
         this.probleme = this.problemeForm.value;
         // Affecter les valeurs qui proviennent du fg le plus interne.
         this.probleme.courriel =  this.problemeForm.get('courrielGroup.courriel').value;
         this.probleme.courrielConfirmation =  this.problemeForm.get('courrielGroup.courrielConfirmation').value;      
         this.probleme.noTypeProbleme = stringify( this.problemeForm.get('typeProbleme').value);
         this.probleme.notification = this.problemeForm.get('typeNotification').value;
         console.log('Jessai de save les valeurs suivantes: ' + this.probleme);
        this.problemeService.saveprobleme(this.probleme)
            .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );
    } 
  }
  
  onSaveComplete(): void {
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.messageSauvegarde = 'Votre demande a bien été sauvegardée.  Nous vous remercions.';
  }
}
