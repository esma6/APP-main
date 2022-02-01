import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoListViewAction } from '@po-ui/ng-components';
import { Web3Service } from 'src/app/data/services/web3.service';

@Component({
  selector: 'app-dev-pool',
  templateUrl: './dev-pool.component.html',
  styleUrls: ['./dev-pool.component.scss'],
})
export class DevPoolComponent implements OnInit {
  readonly actionsDev: Array<PoListViewAction> = [
    {
      label: 'Add Level',
      action: this.addLevel.bind(this),
      icon: 'po-icon-plus-circle',
    },
    {
      label: 'Remove all Levels',
      action: this.undoLevel.bind(this),
      type: 'danger',
      icon: 'po-icon-minus-circle',
    },
  ];

  public loadingDeveloperPool: boolean = false;
  public accountDetails: any;
  public developerAdd: any;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'Developer-pool' }],
  };
  developerAccount: any;
  totalSupply: any;

  public devsAcc: any = [];

  public _currentContractEra: any;

  public allowance: any;
  poolAddress: any;
  _nextApproveTime: any;

  constructor(private web3: Web3Service) {}

  ngOnInit(): void {
    this.accountDetails = '123';
    this.web3.totalSupply().then((res) => {
      console.log('Total Supply' + res);
      this.totalSupply = res;

      this.getDevs();

      this.currentContractEra();
      this.nextApproveTime()
    });
  }

  getDevs() {
    this.devsAcc = [];
    this.web3.getDevelopersAddress().then((devs) => {
      if (devs) {
        for (let i = 0; i < devs.length; i++) {
          this.web3.getDeveloper(devs[i]).then((dev) => {
            const createdAt = new Date(dev.createdAt * 1000).toLocaleDateString(
              'pt-Br'
            );

            const devInfo = Object.assign({}, dev);

            devInfo.createdAtDate = createdAt;

            console.log(devInfo);
            if (
              devInfo._address.toUpperCase() ==
              this.web3.account[0].toUpperCase()
            ) {
              console.log('eu sou o dev ');

              this.developerAccount = devInfo;

              this.actionsDev[0].disabled = true;
              this.actionsDev[1].disabled = true;
              this.allowanceDevTokens();
            }
            this.devsAcc.push(devInfo);
          });
        }
      }
    });
  }

  addDeveloper() {
    this.web3.addDeveloper(this.developerAdd).then((res) => {
      console.log(res);
    });
  }

  currentContractEra() {
    this.web3.currentContractEra().then((res) => {
      console.log(res);
      this._currentContractEra = res;
    });
  }

  getDev() {
    this.web3.getDeveloper(this.developerAdd).then((res) => {
      console.log(res);
      this.developerAccount = res;
    });
  }

  addLevel(address: any) {
    this.web3.addDevLevel(address._address).then((res) => {
      console.log(res);
      this.getDevs();
    });
  }

  undoLevel(address: any) {
    this.web3.undoDevLevel(address._address).then((res) => {
      console.log(res);
      this.getDevs();
    });
  }

  aprove() {
    this.web3.aproveDevTokens().then((res) => {
      console.log(res);
    });
  }

  allowanceDevTokens() {
    this.web3.allowanceDevTokens().then((res) => {
      console.log(res);

      this.developerAccount.allowance = res;
    });
  }

  withDraw() {
    this.web3.withDrawDevTokens().then((res) => {
      console.log(res);
    });
  }

  saveContract() {
    console.log(this.poolAddress);

    this.web3
      .addContractPool(this.poolAddress, '750000000000000000000000000')
      .then((res) => {
        console.log(res);
      });
  }

  nextApproveTime(){
    this.web3.nextApproveTime().then((res) => {
      console.log(res);
      this._nextApproveTime =res
    });
  }
}
