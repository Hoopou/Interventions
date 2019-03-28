import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ZonesValidator } from '../shared/longeur-minimum/longeur-minimum.component';
import { ICategorie } from './probleme';
import { CategorieService } from './categorie.service';

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
      prenom: ['' , [ZonesValidator.longueurMinimum(3), Validators.required]],
      nom: ['' , [ZonesValidator.longueurMaximum(50), Validators.required]],
      typeProbleme: ['']
    });

    this.categories.obtenirCategories()
      .subscribe(cat => this.categoriesProbleme = cat ,
                  error => this.errorMessage = <any>error);
  }

}
