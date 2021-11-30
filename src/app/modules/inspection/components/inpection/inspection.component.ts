import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoBreadcrumb,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoSelectComponent,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { Status } from 'src/app/data/models/statusEnum';
import { Web3Service } from 'src/app/data/services/web3.service';

@Component({
  selector: 'app-inpection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss'],
})
export class InspectionComponent implements OnInit {
  @ViewChild('realizeInspectModal') realizeInspectModal!: PoModalComponent;
  @ViewChild('selection') selectionId!: PoSelectComponent;

  public items!: Array<any>;

  public loadingInspection: boolean = false;
  public finishButtonDisabled: boolean = true;
  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'Inspection' }],
  };

  columns: Array<PoTableColumn> = [
    { property: 'createdBy', label: 'Created By' },
    { property: 'created_at', label: 'Created At', type: 'dateTime' },
    { property: 'status', label: 'status' },
  ];

  TableActions: Array<PoTableAction> = [
    {
      action: this.realizeInspectionModalShow.bind(this),
      icon: 'po-icon-warning',
      label: 'Realize',

    },
  ];
  inspectionArray: any;

  public readonly realizeInspectionAction: PoModalAction = {
    action: () => {
      this.realizeInspection();
    },
    label: 'Finish the inspection',
  };

  public readonly realizeInspectCancelAction: PoModalAction = {
    action: () => {
      this.realizeInspectModalClose();
    },
    label: 'Cancel',
  };
  categories: any;
  selectedInspection = {
    inspectionId: '',
    isa: new Array(),
  };

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

  public async getInspections() {
    this.loadingInspection = true;
    this.checkAccount().then(async (res) => {

      console.log(res);
      if (res) {
        this.web3.getInspections().then((res) => {
          console.log(res);
          this.items = [];
          this.inspectionArray = res;

          for (let i = 0; i < this.inspectionArray.length; i++) {
            let initialChars = this.inspectionArray[i]['producerWallet'];

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
                this.inspectionArray[i]['createdAt'] * 1000
              ),
              expiresIn: new Date(
                this.inspectionArray[i]['expiresIn'] * 1000
              ),
              status: Status[this.inspectionArray[i]['status']],
              id: this.inspectionArray[i]['id'],
              prodId: this.inspectionArray[i]['producerWallet'],
              statusEnum: this.inspectionArray[i]['status'],
              dateTimeUnix: this.inspectionArray[i]['createdAt'],
            });
          }

          setTimeout(() => {
            this.loadingInspection = false;
          }, 200);
        });
      } else {
        setTimeout(() => {
          this.loadingInspection = false;
        }, 200);
      }
    });
  }

  realizeInspectionModalShow(inspection: any) {
    console.log(inspection);

    if (inspection.statusEnum != '3') {
      this.poNotification.error({message:'This Inspection is unavailablet to realize!',duration:5000})
    }
    else{


      if ( this.web3.accDetails && this.web3.accDetails?.role == "PRODUCER") {
        this.poNotification.error({
          message: 'The account must be from a Activist to accept the Inspection',
          duration:5000
        })

      } else {
        this.selectedInspection.inspectionId = inspection.id;

        this.web3.getInspection(this.selectedInspection).then((res)=>{
          console.log(res)
        })

        this.web3.getCategories().then((res) => {
          console.log(res);
          this.categories = [];
          res.forEach((el: any) => {
            const obj = {
              name: el.name,
              description: el.description,
              id: el.id,
              index: el.index,
            };
            this.categories.push(obj);
            this.selectedInspection.isa.push([el.id]);
          });

          this.realizeInspectModal.open();
        });
      }

    }


  }

  selectISA(isaId: any, item: any) {
    let categorieId = parseInt(item.id) - 1;
    this.selectedInspection.isa[categorieId] = [item.id, isaId];

    console.log(this.selectedInspection);
    let arrayValidator = 2* this.selectedInspection.isa.length;
    let arrayValidatorLength = 0;

    for (let i = 0; i < this.selectedInspection.isa.length; i++) {

      if (this.selectedInspection.isa[i].length == 2) {
        arrayValidatorLength += 2
      }

    }

    if (arrayValidatorLength >= arrayValidator) {
      this.finishButtonDisabled = false;
    }

console.log(arrayValidatorLength, arrayValidator)
    console.log(isaId);
    console.log(item);
  }

  realizeInspectModalClose() {
    this.realizeInspectModal.close();
  }

  realizeInspection() {

    if (this.finishButtonDisabled) {
      this.poNotification.error({ message: 'Select the Isa of all categories', duration: 3000 })
    }else{
      this.realizeInspectModal.close();
      this.loadingInspection = true;
      console.log('Inspection finished');
      console.log(this.selectedInspection)
      this.web3.realizeInspection(this.selectedInspection).then((res)=>{
        console.log(res)
        this.loadingInspection = false;
        this.poNotification.success({
          message:'Inpection realized with success',
          duration: 5000
        })
      },(err)=>{
        this.loadingInspection = false;
        this.poNotification.error({
          message:'Inpection realized error' + err.message,
          duration: 5000
        })
      })

    }
  }
}
