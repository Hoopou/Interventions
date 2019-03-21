import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ZonesValidator } from '../shared/longeur-minimum/longeur-minimum.component';

@Component({
  selector: 'stk-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['' , [ZonesValidator.longueurMinimum(3), Validators.required]]
    });
  }

}
