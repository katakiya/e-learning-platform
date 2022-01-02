import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  makePayment(orderId: any, amount: number): boolean {
    // call actual payment service
    // it should return payment success or not
    // here , we are assuming that payment is successfull
    return true;
  }
}
