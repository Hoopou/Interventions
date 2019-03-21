import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
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
    zone.setValue('a'.repeat(2))
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
});
