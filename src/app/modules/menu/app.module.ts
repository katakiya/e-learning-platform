import { NgModule } from "@angular/core";
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { MaterialModule } from "../material/material.module";
import { AppRoutingModule } from "src/app/app-routing.module";
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
  declarations: [
    TopMenuComponent
  ],
  exports: [TopMenuComponent],
  imports: [
    MaterialModule,
    AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: []
})

export class AppModuleMenu {

}