/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {
    this.init();
  }

  async init() {}

  public storageSet(settingName: any, value: any) {
    return localStorage.setItem(`${settingName}`, value);
  }
  public async storageGet(settingName: any) {
    return await localStorage.getItem(`${settingName}`);
  }
  public async storageRemove(settingName: any) {
    return await localStorage.removeItem(`${settingName}`);
  }
  public storageClear() {
   return localStorage.clear();
  }
}
