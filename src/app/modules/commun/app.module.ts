import { NgModule } from "@angular/core";
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppModuleAuth } from "../auth/app.module";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";

@NgModule({
    declarations:[
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent
  ],
  exports:[
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent
  ],
    imports:[
      AppModuleAuth,
      CommonModule,
      MaterialModule
    ],
    providers:[],
    bootstrap:[]
})

export class AppModuleCommun{
    
}