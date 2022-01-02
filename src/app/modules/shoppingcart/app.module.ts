import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    ShoppingcartComponent
  ],
  exports: [],
  imports: [
    MaterialModule,
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: []
})

export class AppModuleShoppingCart {

}