import { Injectable  } from "@angular/core";
import { 
    Router,
    CanActivate,
    ActivatedRouteSnapshot
  } from '@angular/router';

@Injectable({
    providedIn: "root"
  })
export class AuthGuard implements CanActivate  {
    constructor(private router: Router) {
    }

     canActivate(route: ActivatedRouteSnapshot): boolean {
       const token = localStorage.getItem('token');
       if(token){
           return true;
       }
       else {
           
        this.router.navigate(['login']).then(()=>location.reload());
       } 
    }

    
}