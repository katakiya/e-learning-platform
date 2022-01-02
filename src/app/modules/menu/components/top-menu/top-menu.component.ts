import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import { UserService } from 'src/app/modules/users/services/user.service';
import { Router } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { ShoppingCartService } from 'src/app/modules/shoppingcart/services/shopping-cart.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  user: any;
  isAdmin = false;
  sizeOfCart: number = 0;
  constructor(private authService: AuthenticationService, private userService: UserService,
    private route: Router, private shoppingCartService: ShoppingCartService) { }

  // Get loggedIn user , Size of Cart and check if user is Admin or not
  ngOnInit(): void {

    this.authService.getLoggedInUser()
      .pipe(
        mergeMap(user => this.shoppingCartService.getCoursesOfShoppingCart()
          .pipe(
            map(courses => [user, courses])
          )
        )
      )
      .subscribe(([user, courses]) => {
        this.user = user;

        let u1 = this.user as any;
        this.sizeOfCart = (courses as any[]).length;

        console.log("SizeOfCart For Menu::", this.sizeOfCart)
        if (user) {
          this.userService.getUserByUid(u1.uid).subscribe(usr => {

            if (usr) {
              this.isAdmin = usr.isAdmin;
            }


          })
        }
      });
  }

  // Logout user
  onLogout() {
    this.authService.logoutWithGoogle();
  }



}
