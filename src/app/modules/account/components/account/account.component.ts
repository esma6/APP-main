import { checkContractService } from './../../../../data/services/checkContract.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoBreadcrumb,
  PoListViewAction,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoWidgetComponent,
} from '@po-ui/ng-components';
import { Web3Service } from 'src/app/data/services/web3.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @ViewChild('widget', { static: true }) widgetElement!: PoWidgetComponent;
  @ViewChild('inspectionModal') inspectionModal!: PoModalComponent;


  accountWallet!: string | null;
  public loadingAccount: boolean = false;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'account' }],
  };
  accountDetails: any | null;
  accountRole!: string;

  inspections: any;

  readonly actions: Array<PoListViewAction> = [
    {
      label: `See account detail`,
      action: this.seeDetail.bind(this),
      icon: 'po-icon po-icon-eye',
    },
  ];
  inpectionAccount: any;

  constructor(
    private route: ActivatedRoute,
    private poNotification: PoNotificationService,
    private router: Router,
    private checkAccount: checkContractService,
    private web3: Web3Service
  ) {}

  ngOnInit(): void {
    this.accountWallet = this.route.snapshot.paramMap.get('id');

    if (this.accountWallet) {
      this.getAccount();
    } else {
      this.poNotification.error({
        message: 'You must be logged to access account!',
        duration: 5000,
      });
      this.router.navigate(['dashboard/isa']);
    }
  }

  getAccount() {
    this.loadingAccount = true;
    this.checkAccount.checkAccount().then((acc) => {
      this.inspections = [];
      if (acc) {
        this.web3.getUser().then((res) => {
          console.log(res);

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
                this.loadingAccount = false;

                this.web3.getInspectionsHistory().then((res) => {
                  this.inspections = res.map((item: any) =>
                    Object.assign({}, item, {
                      date: new Date(item.createdAt * 1000).toLocaleDateString(
                        'pt-Br'
                      ),
                    })
                  );
                  console.log(this.inspections);
                });
              });
              break;

            case '2':
              this.web3.getActivist().then((res) => {
                this.accountRole = 'Activist';
                this.accountDetails = res;
                this.loadingAccount = false;

                this.web3.getInspectionsHistory().then((res) => {
                  this.inspections = res.map((item: any) =>
                    Object.assign({}, item, {
                      date: new Date(item.createdAt * 1000).toLocaleDateString(
                        'pt-Br'
                      ),
                    })
                  );
                  console.log(this.inspections);
                });
              });
              break;
          }
        });

        /*
       this.web3.producerExists().then((res)=>{
          console.log( res)
          if(!res){
            this.web3.activistExists().then((res)=>{
              console.log( res)
              if(!res){
                this.loadingAccount = false;
                this.router.navigate(['dashboard/register'])
              }else{
                this.loadingAccount = false;
                this.web3.getActivist().then(res=>{

                  this.accountRole = 'Activist'
                  this.accountDetails = res
                })
              }
            })
          }else{
            this.loadingAccount = false;
            this.web3.getProducer().then(res=>{
              this.accountRole = 'Producer'
              console.log(res)
              this.accountDetails = res
            })
          }
        })*/
      } else {
        this.loadingAccount = false;
      }
    });
  }


  seeDetail(inpection: any) {
    console.log(inpection);



    if (this.accountRole == 'Producer') {

      this.web3.getActivist(inpection.activistWallet).then((res) => {

        console.log(res);

        this.inpectionAccount = res;
        setTimeout(() => {
          this.inspectionModal.open();
        }, 200);
      });
    } else {
      this.web3.getProducer(inpection.producerWallet).then((res) => {

        console.log(res);

        this.inpectionAccount = res;
        console.log( this.inpectionAccount?.property_address.city)

        setTimeout(() => {
          this.inspectionModal.open();
        }, 200);

      });

    }
  }
}
