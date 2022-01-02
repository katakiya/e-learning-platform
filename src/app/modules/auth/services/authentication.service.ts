import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import  firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';
import { UserService } from '../../users/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  constructor(private fireAuth:AngularFireAuth,private route:Router,private userService:UserService) {
      this.fireAuth.authState.subscribe(user=>{
                                            console.log(user);
                                            if(user)
                                              this.userService.saveUser(user);
                                        });
   }

  //canActivate Method to check Logged In Users
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.fireAuth.authState.pipe(
      map(user=>{
         if(user){
           return true;
         }else{
           this.route.navigate(['/login']);
           return false;
         }
      })
  )
  }

  // Login With Google
  loginWithGoogle() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider);
  }  

  // Logout using Google
  logoutWithGoogle(){
    return this.fireAuth.signOut()
        .then(result=>{
             this.route.navigate(['/home'])
             console.log("Logged Out!!!",result);
        })
        .catch(err=>{
            console.log(err);
        })
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.fireAuth.signInWithRedirect(provider)
    .then((result) => {
        console.log('You have been successfully logged in!',result)
    }).catch((error) => {
        console.log(error)
    })
  }

  // return Logged In user
  getLoggedInUser(){
     return this.fireAuth.authState;
  }

 

}
