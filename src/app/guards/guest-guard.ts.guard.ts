import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../data/services/auth.service';
import { StorageService } from '../data/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router,private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ): boolean {
    if (!this.authService.hasSession()) {
      return true;
    }
    this.router.navigate(['dashboard/']);
    return true;

  }


}
