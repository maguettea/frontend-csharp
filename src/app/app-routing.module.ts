import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPersonneComponent } from './list-personne/list-personne.component';
import { CreatePersonneComponent } from './create-personne/create-personne.component';
import { UpdatePersonneComponent } from './update-personne/update-personne.component';
import { DetailsPersonneComponent } from './details-personne/details-personne.component';


const routes: Routes = [
  {path:'personnes', component:ListPersonneComponent},
  {path:'', redirectTo:'personnes', pathMatch:'full'},
  {path:'Create-personne', component:CreatePersonneComponent},
  {path:'details-personne/:id', component:DetailsPersonneComponent},
  {path:'update-personne/:id', component:UpdatePersonneComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }