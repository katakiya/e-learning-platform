import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  orderId: any = "N/A";
  constructor(private route: ActivatedRoute) { }

  // Get Order Id
  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
  }

}
