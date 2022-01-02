import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { OrdersComponent } from "./components/orders/orders.component";
import { OrderSuccessComponent } from './components/order-success/order-success.component';

@NgModule({
    declarations: [
        OrdersComponent,
        OrderSuccessComponent,

    ],
    exports: [OrdersComponent],
    imports: [
        MaterialModule,
        CommonModule
    ],
    providers: [],
    bootstrap: []
})

export class AppModuleOrders {

}