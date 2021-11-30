
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  constructor(private web3:Web3Service) { }


 async checkProducer(){
    const producer = this.web3.getProducer()
    const isProducer = await  producer?  true: false;
    return isProducer
  }

 async checkActivist(){
    const activist = this.web3.getActivist()
    const isActivist = await  activist?  true: false;
    return isActivist
  }
}
