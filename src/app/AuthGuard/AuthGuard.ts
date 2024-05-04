import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigate(['/log-in']); // Redirect to login if not authenticated
          return false;
        }
        return true;
      })
    );
  }
}
