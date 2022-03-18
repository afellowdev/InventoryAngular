import { HttpClientModule } from '@angular/common/http' //kev
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  //kev

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { MatExpansionModule } from '@angular/material/expansion';
import {NgxPaginationModule} from 'ngx-pagination';

import { InventoryApiService } from './inventory-api.service';

import { ItemComponent } from './item/item.component';
import { ShowItemComponent } from './item/show-item/show-item.component';
import { AddEditItemComponent } from './item/add-edit-item/add-edit-item.component';

import { HomeComponent } from './home/home.component';

import { AboutComponent } from './about/about.component';
import { CoverletterComponent } from './about/coverletter/coverletter.component';
import { ResumeComponent } from './about/resume/resume.component';
import { PlansComponent } from './plans/plans.component';
import { SchemasComponent } from './schemas/schemas.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ShowItemComponent,
    AddEditItemComponent,
    HomeComponent,
    AboutComponent,
    CoverletterComponent,
    ResumeComponent,
    PlansComponent,
    SchemasComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,   
    FormsModule,        
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    NgxPaginationModule
  ],
  providers: [InventoryApiService], //kev
  bootstrap: [AppComponent]
})
export class AppModule { }
