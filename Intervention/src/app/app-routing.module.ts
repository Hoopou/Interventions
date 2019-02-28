import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BienvenueComponent } from './bienvenue/bienvenue.component';

const routes: Routes = [
  {path:'bienvenue' , component: BienvenueComponent},
  {path:'' , redirectTo: 'bienvenue', pathMatch:'full'},
  {path:'**' , redirectTo: 'bienvenue', pathMatch:'full'}//si la route est inexistnte, rediriger vers la page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
