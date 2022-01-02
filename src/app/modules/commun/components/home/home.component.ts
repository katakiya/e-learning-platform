import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any;
  displayName:any=""
  constructor(private authService:AuthenticationService) { }

  // get loggedIn user and displayName
  ngOnInit(): void {
    this.authService.getLoggedInUser()
                          .subscribe(user=>{
                              this.user = user;
                              this.displayName = user?.displayName;
                          });
  }

}
