import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoBreadcrumb,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
  PoTableAction,
  PoTableColumn,
  PoTableComponent,
  PoTableDetail,
} from '@po-ui/ng-components';
import { resultDescription, Status } from 'src/app/data/models/statusEnum';
import { Web3Service } from 'src/app/data/services/web3.service';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.scss'],
})
export class InspectionsComponent implements OnInit {
  @ViewChild('inspectModal') inspectModal!: PoModalComponent;
  @ViewChild('acceptInspectModal') acceptInspectModal!: PoModalComponent;
  @ViewChild('resultInspectModal') resultInspectModal!: PoModalComponent;
  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;

  items!: Array<any>;
  totalExpanded!: number;
  inspectionsArray: any;
  public loadingInspections: boolean = false;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'Inspections' }],
  };

  public readonly actions: Array<PoPageAction> = [
    {
      label: 'Load Inspections',
      action: this.getInspections.bind(this),
      icon: 'po-icon-change',
      disabled: () => !this.web3.account || this.userType == 2,
    },
    {
      label: 'Create New Inspection',
      action: this.addInspections.bind(this),
      icon: 'po-icon-change',
      disabled: () => !this.web3.account || this.userType == 2,
    },
  ];

  TableActions: Array<PoTableAction> = [
    {
      action: this.inspectionDetails.bind(this),
      icon: 'po-icon-warning',
      label: 'Accept',
    },
    {
      action: this.inspectionResult.bind(this),
      icon: 'po-icon-export',
      label: 'See Result',
    },
  ];

  public readonly requestInspectionAction: PoModalAction = {
    action: () => {
      this.requestInspection();
    },
    label: 'Request',
  };

  public readonly acceptInspectionAction: PoModalAction = {
    action: () => {
      this.acceptInspection();
    },
    label: 'Accept',
  };

  public readonly inspectCancelAction: PoModalAction = {
    action: () => {
      this.inspectModalClose();
    },
    label: 'Cancel',
  };

  public readonly resultInspectCancelAction: PoModalAction = {
    label: 'Close',
    action: () => {
      this.resultInspectModalClose();
    },

  };

  public readonly acceptInspectCancelAction: PoModalAction = {
    action: () => {
      this.acceptInspectModalClose();
    },
    label: 'Cancel',
  };

  inspectDetail: PoTableDetail = {
    columns: [
      { property: 'totallySustainable', label: 'Totally Sustainable' },
      { property: 'partiallySustainable', label: 'Partially Sustainable' },
      { property: 'neutro', label: 'Neutro' },
      {
        property: 'Partially Not Sustainable',
        label: 'Parcialmente não Sustentável',
      },
      {
        property: 'totallyNotSustainable',
        label: 'Totally Not Sustainable',
      },
    ],
    typeHeader: 'top',
  };

  columns: Array<PoTableColumn> = [
    { property: 'createdBy', label: 'Created By' },
    { property: 'created_at', label: 'Created At', type: 'dateTime' },
    { property: 'expiresIn', label: 'Expires In', type: 'dateTime' },
    {
      property: 'status',
      type: 'label',
      labels: [
        { value: 'Inspected', color: 'color-11', label: 'Inspected' },
        { value: 'Open', color: 'color-08', label: 'Open' },
        { value: 'Accepted', color: 'color-01', label: 'Accepted' },
        { value: 'Expired', color: 'color-07', label: 'Expired' },
      ],
    },

    { property: 'isa', label: 'Isa Average' },

    {
      property: 'detail',
      label: 'Details',
      type: 'detail',
      detail: this.inspectDetail,
    },
  ];
  selectedInspection: any;
  userType: any;
  categories: any;

  IsaStatus = [
    'Totally Sustainable',
    'Partially Sustainable',
    'Neutro',
    'Partially Not Sustainable',
    'Totally Not Sustainable',
  ];

  constructor(
    private web3: Web3Service,
    public poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.getInspections();
  }

  async checkAccount() {
    if (this.web3.account) {
      if (!this.web3.web3js) {
        await this.web3.loadWeb3();
      }

      if (!this.web3.sintropContract) {
        await this.web3.loadAbisContract();
      }

      return true;
    } else {
      const web3 = await this.web3.loadWeb3().then(async (e) => {
        if (!this.web3.web3js) {
          await this.web3.loadWeb3();
          return true;
        }

        if (!this.web3.sintropContract) {
          await this.web3.loadAbisContract();
          return true;
        }
        return e;
      });

      if (await web3) {
        return true;
      } else {
        return false;
      }
    }
  }

  collapseAll() {
    this.items.forEach((item: any, index: any) => {
      if (item.detail) {
        this.onCollapseDetail();
        this.poTable.collapse(index);
      }
    });
  }
  expandAll() {
    this.totalExpanded = 0;
    this.items.forEach((item: any, index: any) => {
      if (item.detail) {
        this.onExpandDetail();
        this.poTable.expand(index);
      }
    });
  }

  onCollapseDetail() {
    this.totalExpanded -= 1;
    this.totalExpanded = this.totalExpanded < 0 ? 0 : this.totalExpanded;
  }
  onExpandDetail() {
    this.totalExpanded += 1;
  }

  public async getInspections() {
    this.getCategories();
    this.loadingInspections = true;
    this.web3.getUser().then((res) => {
      console.log(res);

      this.userType = res;
    });

    this.checkAccount().then(async (res) => {
      console.log(res);
      if (res) {
        this.web3.getInspections().then((res) => {
          this.items = [];
          this.inspectionsArray = res.map((item: any) =>
            Object.assign({}, item, {
              date: new Date(item.createdAt * 1000).toLocaleDateString('pt-Br'),
              result: [],
            })
          );

          setTimeout(() => {
            console.log(this.categories);

            /**/ for (let i = 0; i < this.inspectionsArray.length; i++) {
              if (this.inspectionsArray[i].status !== '0') {
                for (
                  let index = 0;
                  index < this.inspectionsArray[i].isas?.length;
                  index++
                ) {


                  console.log(this.inspectionsArray);
                  if (   this.inspectionsArray[i].isas[index][0]) {
                    const categorieDetail =[]
                    categorieDetail.push(this.categories[this.inspectionsArray[i].isas[index][0] - 1].totallySustainable)
                    categorieDetail.push(this.categories[this.inspectionsArray[i].isas[index][0] - 1].partiallySustainable)
                    categorieDetail.push(this.categories[this.inspectionsArray[i].isas[index][0] - 1].neutro)
                    categorieDetail.push(this.categories[this.inspectionsArray[i].isas[index][0] - 1].partiallyNotSustainable)
                    categorieDetail.push(this.categories[this.inspectionsArray[i].isas[index][0] - 1].totallyNotSustainable)

                    let categorie =
                    this.categories[
                      this.inspectionsArray[i].isas[index][0] - 1
                    ];
                    this.inspectionsArray[i].result.push({
                      categorie: categorie,
                      value:
                        this.IsaStatus[this.inspectionsArray[i].isas[index][1]],
                        result: resultDescription[parseInt(this.inspectionsArray[i].isas[index][1])],
                      resultDescription:
                      categorieDetail[this.inspectionsArray[i].isas[index][1]],
                    });
                  }


                }
              }
            }

            for (let i = 0; i < this.inspectionsArray.length; i++) {
              let initialChars = this.inspectionsArray[i]['producerWallet'];

              let createdBy = `${initialChars.substring(
                0,
                5
              )}...${initialChars.substring(
                initialChars.length - 5,
                initialChars.length
              )}`;

              this.items.push({
                createdBy: createdBy,
                created_at: new Date(
                  this.inspectionsArray[i]['createdAt'] * 1000
                ),
                expiresIn: new Date(
                  this.inspectionsArray[i]['expiresIn'] * 1000
                ),
                status: Status[this.inspectionsArray[i]['status']],
                id: this.inspectionsArray[i]['id'],
                date: this.inspectionsArray[i]['date'],
                prodId: this.inspectionsArray[i]['producerWallet'],
                statusEnum: this.inspectionsArray[i]['status'],
                dateTimeUnix: this.inspectionsArray[i]['createdAt'],
                isa: this.inspectionsArray[i]['isaPoints'],
                results: Status[this.inspectionsArray[i]['status']],
                activistWallet: this.inspectionsArray[i]['activistWallet'],
                result: this.inspectionsArray[i]['result'],
              });
            }

            setTimeout(() => {
              this.loadingInspections = false;
            }, 200);
          }, 500);
        });
      } else {
        setTimeout(() => {
          this.loadingInspections = false;
        }, 200);
      }
    });
  }

  public inspectionDetails(inspection: any) {
    this.selectedInspection = inspection;
    console.log(this.selectedInspection);
    if (this.selectedInspection.statusEnum != '0') {
      this.poNotification.error({
        message: 'This inspection is unavailable to get accepted!',
        duration: 5000,
      });
    } else {
      this.acceptInspectModal.open();
    }
  }

  public inspectionResult(inspection: any) {
    console.log(inspection);

    if (inspection.statusEnum != '0') {
      this.selectedInspection = inspection;
      this.resultInspectModal.open();
    } else {
      this.poNotification.error({
        message: 'This inspection must be inspected before!',
        duration: 5000,
      });
    }
  }

  public addInspections() {
    this.inspectModal.open();
  }

  requestInspection() {
    this.inspectModalClose();
    this.loadingInspections = true;
    this.web3.requestInspection().then(
      (res) => {
        console.log(res);
        this.notificationAlertSuccess('Request completed!');
        this.getInspections();
        this.loadingInspections = false;
      },
      (err) => {
        this.notificationAlertError(err);
        this.loadingInspections = false;
      }
    );
  }

  async getCategories() {
    this.web3.getCategories().then((res) => {
      this.categories = res;
    });
  }

  acceptInspection() {
    this.acceptInspectModal.close();

    this.loadingInspections = true;
    console.log(this.web3.accDetails);

    if (this.web3.accDetails && this.web3.accDetails.role == 'PRODUCER') {
      this.poNotification.error({
        message: 'The account must be from a Activist to accept the Inspection',
        duration: 5000,
      });
      this.loadingInspections = false;
      return;
    } else {
      this.web3.acceptInspection(this.selectedInspection.id).then(
        (res) => {
          this.loadingInspections = false;
          this.notificationAlertSuccess(
            'Inspection accepted: ' + res.transactionHash
          );
          this.getInspections();
          console.log(res);
        },
        (err) => {
          this.loadingInspections = false;
          console.log(err);
          this.notificationAlertError('Error with your request ' + err.message);
        }
      );
    }
  }

  inspectModalClose() {
    this.inspectModal.close();
  }

  resultInspectModalClose() {
    this.resultInspectModal.close();
  }
  acceptInspectModalClose() {
    this.selectedInspection = '';
    this.acceptInspectModal.close();
  }

  async notificationAlertError(err: any) {
    await this.poNotification.error({ message: err, duration: 3000 });
  }

  async notificationAlertSuccess(msg: string) {
    await this.poNotification.success({ message: msg, duration: 3000 });
  }
}
