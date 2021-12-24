import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root',
})
export class checkContractService {

  constructor(private web3:Web3Service){

  }


  async checkAccount() {
    if (this.web3.account) {
      if (!this.web3.web3js) {
        await this.web3.loadWeb3();
      }

      if (!this.web3.sintropContract) {
        await this.web3.loadAbisContract();
      }

      if (!this.web3.SATContract) {
        await this.web3.loadAbisContract();
      }

      return true;
    } else {
      return false;
    }
  }

}
