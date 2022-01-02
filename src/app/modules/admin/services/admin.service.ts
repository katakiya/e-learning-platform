import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { UserService } from '../../users/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate  {

  isAdmin:boolean = false;
  constructor(private userService : UserService , private authService : AuthenticationService ) { }

  // canActivate Method for Admin User
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.authService.getLoggedInUser()
    .subscribe(user=>{                 
                  if(user){
                     this.userService.getUserByUid(user.uid).subscribe(usr=>{
                          if(usr){
                             this.isAdmin = usr.isAdmin;
                          }
                     })
                  }
             });
    return this.isAdmin;
     
  }
}
