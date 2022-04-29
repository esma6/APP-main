import { ProducerPoolService } from 'src/app/data/services/producer-pool.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService } from '@po-ui/ng-components';
import { checkContractService } from 'src/app/data/services/checkContract.service';
import { Web3Service } from 'src/app/data/services/web3.service';
import { SharedService } from 'src/app/data/services/shared.service';

@Component({
  selector: 'app-producer-pool',
  templateUrl: './producer-pool.component.html',
  styleUrls: ['./producer-pool.component.scss'],
})
export class ProducerPoolComponent implements OnInit {
  public loadingProducerPool: boolean = false;
  public accountDetails: any;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'producer-pool' }],
  };
  accountRole!: string;
  totalSat: any;
  balanceOfValue: any;
  poolAddress: any;

  constructor(
    private route: ActivatedRoute,
    private poNotification: PoNotificationService,
    private router: Router,
    private checkAccount: checkContractService,
    private web3: Web3Service,
    private producerPollService: ProducerPoolService,
    private sharedService:SharedService
  ) {}

  ngOnInit(): void {
    this.getAccount();
    this.allowance();
    this.totalSupply();
    this.balanceOf();

  }

  getAccount() {
    this.loadingProducerPool = true;
    this.checkAccount.checkAccount().then((acc) => {
      if (acc) {
        this.web3.getUser().then((res) => {
          switch (res) {
            case '0':
              console.log('new register');
              this.router.navigate(['dashboard/register']);
              break;

            case '1':
              this.web3.getProducer().then((res) => {
                this.accountRole = 'Producer';
                console.log(res);
                this.accountDetails = res;
                this.loadingProducerPool = false;
              });
              break;

            case '2':
              this.web3.getActivist().then((res) => {
                this.accountRole = 'Activist';
                this.accountDetails = res;
                this.loadingProducerPool = false;
                this.notificationAlertError('You must be a Producer to access Producer Pool').then(()=>{
                  this.router.navigate(['dashboard/isa'])
                })
              });
              break;
          }
        });
      } else {
        this.loadingProducerPool = false;
      }
    });
  }

  approveFunds() {
    /*  this.producerPollService.aprove().then((res) => {
      console.log(res);
    });*/
  }

  async totalSupply() {
    this.web3.totalSupply().then((res) => {
    this.totalSat =res
    });
  }

  async allowance() {
    this.web3.SATAllowance().then((res) => {
      console.log(res);
    });
  }

  async balanceOf() {
    this.web3.balanceOf().then((res) => {
      console.log(res);
      this.balanceOfValue = res
    });
  }

  async withdraw(){
    this.web3.withDraw().then((res) => {
      console.log(res);
    });
  }

  async aprove() {
    this.web3.approve().then((res) => {
      console.log(res);
    });
  }

  async notificationAlertError(err: any) {
    await this.poNotification.error({ message: err, duration: 3000 });
  }

  async notificationAlertSuccess(msg: string) {
    await this.poNotification.success({ message: msg, duration: 3000 });
  }

  saveContract(){
    console.log( this.poolAddress)

    this.web3.addContractPool(this.poolAddress,'750000000000000000000000000').then((res)=>{
      console.log(res)
    })

  }
}
