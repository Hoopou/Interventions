import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ZonesValidator } from '../shared/longeur-minimum/longeur-minimum.component';
import { ICategorie } from './probleme';
import { CategorieService } from './categorie.service';
import { emailMatcherValidator} from '../shared/courrielValidation/courrielValidation.component';

@Component({
  selector: 'stk-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  categoriesProbleme: ICategorie[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private categories: CategorieService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['', [ZonesValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [ZonesValidator.longueurMaximum(50), Validators.required]],
      typeProbleme: [''],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }),
      telephone: [{ value: '', disabled: true }],
    });

    this.categories.obtenirCategories()
      .subscribe(cat => this.categoriesProbleme = cat,
        error => this.errorMessage = <any>error);
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
        courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()]), Validators.required]);               
        courrielGroupControl.enable();  
        courrielControl.setValidators([Validators.required]);      
        courrielControl.enable();  
        courrielConfirmationControl.setValidators([Validators.required]);              
        courrielConfirmationControl.enable();  
        // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
        // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
        
      }else
        if(typeNotification === 'parMessageTexte'){
          telephoneControl.setValidators([Validators.required]);
          telephoneControl.enable();
          // telephoneControl.setValidators([]);
        }
    }
    courrielGroupControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }
}
