import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';

const routes: Routes = [
  {path:'accueil' , component: AccueilComponent},
  {path:'probleme' , component: ProblemeComponent},
  {path:'' , redirectTo: 'accueil', pathMatch:'full'},
  {path:'**' , redirectTo: 'accueil', pathMatch:'full'}//si la route est inexistnte, rediriger vers la page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
