import { NgModule } from "@angular/core";
import { LoginComponent } from './components/login/login.component';
import { AngularFireModule } from "@angular/fire/compat";
import { MaterialModule } from "../material/material.module";
@NgModule({
    declarations:[
    LoginComponent
  ],
  exports:[LoginComponent],
    imports:[
      AngularFireModule,
      MaterialModule
    ],
    providers:[],
    bootstrap:[]
})

export class AppModuleAuth{
    
}