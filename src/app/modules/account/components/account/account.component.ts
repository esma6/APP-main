import { checkContractService } from './../../../../data/services/checkContract.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService, PoWidgetComponent } from '@po-ui/ng-components';
import { Web3Service } from 'src/app/data/services/web3.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @ViewChild('widget', { static: true }) widgetElement!: PoWidgetComponent;
  accountWallet!:string | null ;
  public loadingAccount:boolean = false;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'account' }],
  };
  accountDetails: any | null;
  accountRole!: string;
  constructor(private route: ActivatedRoute,private poNotification:PoNotificationService,
    private router:Router,private checkAccount:checkContractService,
    private web3:Web3Service) { }

  ngOnInit(): void {
    this.accountWallet = this.route.snapshot.paramMap.get('id');


    if (this.accountWallet) {
      this.getAccount()
    } else {
      this.poNotification.error({
        message:'You must be logged to access account!',
        duration:5000
      })
      this.router.navigate(['dashboard/isa'])
    }
  }

  getAccount(){
    this.loadingAccount = true;
    this.checkAccount.checkAccount().then((acc)=>{

      if (acc) {
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
        })
console.log(this.accountDetails)
      } else {
        this.loadingAccount = false;
      }
    })


  }

}
