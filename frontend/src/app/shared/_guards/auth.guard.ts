import {
  CanActivate,
  Router, UrlTree,
} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return of(this.authService.isAuthenticated()).pipe(
      map(isAuth => {
        if (isAuth) {
          return true;
        } else {
          // Redirige vers la page de login si non authentifié
          return this.router.createUrlTree(['/login'], {
            queryParams: {error: 'not-authenticated'}
          });
        }
      })
    );
  }
}
