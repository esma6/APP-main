
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor() { }

  public hasSession(): boolean {
    const token = this.getToken();
    const hasToken = token ? true : false;
    return hasToken
  }

  public getToken(): string {
    const token = localStorage.getItem('metaToken') || ''
    return token
  }




}
