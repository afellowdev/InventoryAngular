import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './item/item.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlansComponent } from './plans/plans.component';
import { SchemasComponent } from './schemas/schemas.component';

//todo:
const routes: Routes = [
  // {path:'inventory', component:ItemComponent},
  // {path:'home', component:HomeComponent},

  {path:'demo', component:ItemComponent},
  {path:'play', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'plans', component:PlansComponent},
  {path:'schemas', component:SchemasComponent},
  {path:'', redirectTo: 'play', pathMatch: 'full'},
  {path:'**', component:PageNotFoundComponent}  //wildcard path must go last!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
