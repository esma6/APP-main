import { checkContractService } from './../../../../data/services/checkContract.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoBreadcrumb,
  PoInfoOrientation,
  PoListViewAction,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoWidgetComponent,
} from '@po-ui/ng-components';
import { Web3Service } from 'src/app/data/services/web3.service';
import { resultDescription } from 'src/app/data/models/statusEnum';

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
  orientation: PoInfoOrientation = PoInfoOrientation.Horizontal;
  IsaStatus = [
    'Totally Sustainable',
    'Partially Sustainable',
    'Neutro',
    'Partially Not Sustainable',
    'Totally Not Sustainable',
  ];
  isaScore: number = 0;
  readonly actions: Array<PoListViewAction> = [
    {
      label: `See account detail`,
      action: this.seeDetail.bind(this),
      icon: 'po-icon po-icon-eye',
    },
    {
      label: `Report`,
      action: this.reportInspection.bind(this),
      icon: 'po-icon po-icon-warning',
      type: 'danger',
    },
  ];
  inpectionAccount: any;
  categories: any;
  poolAddress: any;

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
          this.getCategories();
          console.log(res);

          switch (res) {
            case '0':
              console.log('new register');
              this.router.navigate(['dashboard/register']);

              if (res.totalInspections !== '0' ) {
                this.getInspectionsHistory();
              }
              break;

            case '1':
              this.web3.getProducer().then((res) => {
                this.accountRole = 'Producer';
                console.log(res);

                this.accountDetails = res;

                this.loadingAccount = false;

                if (res.totalInspections !== '0' ) {
                  this.getInspectionsHistory();
                }
              });
              break;

            case '2':
              this.web3.getActivist().then((res) => {
                console.log(res)
                this.accountRole = 'Activist';
                this.accountDetails = res;
                this.loadingAccount = false;


                if (res.totalInspections !== '0' ) {
                  this.getInspectionsHistory();
                }
              });
              break;
          }
        });
      } else {
        this.loadingAccount = false;
      }
    });
  }

  getInspectionsHistory() {
    this.web3.getInspectionsHistory().then((res) => {
      let isaScore = 0;
      this.inspections = res.map((item: any) =>
        Object.assign({}, item, {
          date: new Date(item.createdAt * 1000).toLocaleDateString('pt-Br'),
          result: [],
        })
      );

      for (let i = 0; i < this.inspections.length; i++) {
        isaScore += parseInt(this.inspections[i].isaPoints);
        for (let index = 0; index < this.inspections[i].isas.length; index++) {
          const categorieDetail =[]
          categorieDetail.push(this.categories[this.inspections[i].isas[index][0] - 1].totallySustainable)
          categorieDetail.push(this.categories[this.inspections[i].isas[index][0] - 1].partiallySustainable)
          categorieDetail.push(this.categories[this.inspections[i].isas[index][0] - 1].neutro)
          categorieDetail.push(this.categories[this.inspections[i].isas[index][0] - 1].partiallyNotSustainable)
          categorieDetail.push(this.categories[this.inspections[i].isas[index][0] - 1].totallyNotSustainable)
          console.log(categorieDetail)
          this.inspections[i].result.push({
            categorie: this.categories[this.inspections[i].isas[index][0] - 1],
            //value: this.IsaStatus[this.inspections[i].isas[index][1]],
            value: this.IsaStatus[this.inspections[i].isas[index][1]],
            //resultDescription[parseInt(this.inspections[i].isas[index][1])],
            result: resultDescription[parseInt(this.inspections[i].isas[index][1])],
            resultDescription:
            categorieDetail[this.inspections[i].isas[index][1]],
          });
        }
      }

      this.isaScore = isaScore;
      console.log(this.inspections);
      console.log(isaScore);
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
        console.log(this.inpectionAccount?.property_address.city);

        setTimeout(() => {
          this.inspectionModal.open();
        }, 200);
      });
    }
  }

  reportInspection() {
    this.poNotification.error({
      message: 'Inspection reported',
      duration: 3000,
    });
  }

  async getCategories() {
    this.web3.getCategories().then((res) => {
      this.categories = res;
    });
  }


}
