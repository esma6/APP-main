import {  checkContractService } from './../../../../data/services/checkContract.service';
import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoNotificationService } from '@po-ui/ng-components';
import { Web3Service } from 'src/app/data/services/web3.service';
import { ProducerModel } from 'src/app/data/models/producerModel';

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.scss']
})
export class ProducersComponent implements OnInit {

  public loadingProducers: boolean = false;
  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'Producer-Ranking' }],
  };

  producers:any = [];

  constructor(private web3:Web3Service, private checkContract:checkContractService,
    public poNotification: PoNotificationService,) { }

  ngOnInit(): void {
    this.getProducers();
  }


  getProducers(){
    this.loadingProducers = true;
    this.checkContract.checkAccount().then((res)=>{

      if (res) {
        this.web3.getProducers().then((producers:ProducerModel[])=>{
          this.producers = []

          producers.forEach((producer,i) => {
            this.producers.push(producer)
          });
          console.log(this.producers)
          this.loadingProducers = false;})
      } else {
        this.loadingProducers = false;
      }
    })

  }

  reportProducer(producer:any){
    this.poNotification.error({
      message:`${producer.name} reported!`,
      duration: 5000
    })
  }

}
