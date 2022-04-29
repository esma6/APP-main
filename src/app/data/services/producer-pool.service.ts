import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root',
})
export class ProducerPoolService extends Web3Service {
  constructor() {
    super();
  }

  ngOnInit() {}


}
