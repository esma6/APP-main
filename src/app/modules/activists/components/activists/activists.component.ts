import { ActivistModel } from './../../../../data/models/activistModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService } from '@po-ui/ng-components';
import { Web3Service } from 'src/app/data/services/web3.service';
import { checkContractService } from 'src/app/data/services/checkContract.service';

@Component({
  selector: 'app-activists',
  templateUrl: './activists.component.html',
  styleUrls: ['./activists.component.scss'],
})
export class ActivistsComponent implements OnInit {
  public loadingActivists: boolean = false;
  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'Activist-Ranking' }],
  };
  activists:any  =[];

  constructor(
    public web3: Web3Service,
    private poNotification: PoNotificationService,
    private checkContract:checkContractService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getActivists()
  }



  getActivists() {
    this.loadingActivists = true;
    this.checkContract.checkAccount().then(async (e) => {


      console.log(e);

      if (e) {

        this.web3.getActivists().then((activistsArray:ActivistModel[])=>{
          this.activists = []

          activistsArray.forEach((activist:any) => {
            this.activists.push(activist)
          });
          console.log(this.activists)
          this.loadingActivists = false;})


      }else {
        this.loadingActivists = false;
      }
    });
  }

  reportActivist(activist:any){
 this.poNotification.error({
   message:`${activist.name} reported!`,
   duration: 5000
 })
  }
}
