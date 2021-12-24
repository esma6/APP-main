import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService } from '@po-ui/ng-components';
import { checkContractService } from 'src/app/data/services/checkContract.service';
import { Web3Service } from 'src/app/data/services/web3.service';

@Component({
  selector: 'app-activists-pool',
  templateUrl: './activists-pool.component.html',
  styleUrls: ['./activists-pool.component.scss']
})
export class ActivistsPoolComponent implements OnInit {

  public loadingActivistPool:boolean =false;
  public accountDetails:any;
  public accountRole!: string;


  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'activist-pool' }],
  };


  constructor(    private route: ActivatedRoute,
    private poNotification: PoNotificationService,
    private router: Router,
    private checkAccount: checkContractService,
    private web3: Web3Service,) { }

  ngOnInit(): void {
    this.getAccount()
  }

  getAccount() {
    this.loadingActivistPool = true;
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
                this.loadingActivistPool = false;
                this.notificationAlertError('You must be a Activist to access Activist Pool').then(()=>{
                  this.router.navigate(['dashboard/isa'])
                })
              });
              break;

            case '2':
              this.web3.getActivist().then((res) => {
                this.accountRole = 'Activist';
                this.accountDetails = res;
                this.loadingActivistPool = false;

              });
              break;
          }
        });
      } else {
        this.loadingActivistPool = false;
      }
    });
  }

  async notificationAlertError(err: any) {
    await this.poNotification.error({ message: err, duration: 3000 });
  }

  async notificationAlertSuccess(msg: string) {
    await this.poNotification.success({ message: msg, duration: 3000 });
  }

}
