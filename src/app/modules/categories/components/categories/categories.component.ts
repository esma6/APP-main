import { Web3Service } from './../../../../data/services/web3.service';
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
import { map } from 'rxjs/operators';
import { EventService } from 'src/app/data/services/event.service';
import { NgForm } from '@angular/forms';
import { CategoryTable } from 'src/app/data/models/categoryModel';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/data/services/shared.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @ViewChild(PoModalComponent) poModal!: PoModalComponent;
  @ViewChild('voteModal') voteModal!: PoModalComponent;
  @ViewChild('formCategory', { static: true }) formShare!: NgForm;
  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;

  detail: any;
  loadingCategories: boolean = false;
  categoryName!: string;
  categoryDescriptio!: string;
  totallySustainable!: string;
  partiallySustainable!: string;
  neutro!: string;
  partiallyNotSustainable!: string;
  totallyNotSustainable!: string;
  votesCount!: string;
  categoriesArray: any;
  totalExpanded!: number;
  items!: Array<any>;
  selectedCategory!: CategoryTable;
  public readonly actions: Array<PoPageAction> = [
    {
      label: 'Load Categories',
      action: this.getCategories.bind(this),
      icon: 'po-icon-change',
      disabled: () => !this.web3.account ||this.userType == 2,
    },
    {
      label: 'Create New Category',
      action: this.modalOpen.bind(this),
      icon: 'po-icon-change',
      disabled: () => !this.web3.account ||this.userType == 2,
    },
  ];

  public readonly cancelAction: PoModalAction = {
    action: () => {
      this.modalClose();
    },
    label: 'Cancel',
  };

  public readonly voteCancelAction: PoModalAction = {
    action: () => {
      this.voteModalClose();
    },
    label: 'Cancel',
  };

  public readonly createAction: PoModalAction = {
    action: () => {
      this.createCategory();
    },
    label: 'Create',
  };

  public readonly createVote: PoModalAction = {
    action: () => {
      this.addVotetoCategory();
    },
    label: 'Vote',
  };

  airfareDetail: PoTableDetail = {
    columns: [
      { property: 'totallySustainable', label: 'Totally Sustainable' },
      { property: 'partiallySustainable', label: 'Partially Sustainable' },
      { property: 'neutro', label: 'Neutro' },
      {
        property: 'partiallyNotSustainable',
        label: 'Partially Not Sustainable',
      },
      { property: 'totallyNotSustainable', label: 'Totally Not Sustainable' },
    ],
    typeHeader: 'top',
  };

  columns: Array<PoTableColumn> = [
    { property: '_createdBy', label: 'Created By' },
    { property: 'name', label: 'Categories' },
    { property: 'description', label: 'Description' },
    { property: 'votesCount', label: 'Number Of Votes' },
    {
      property: 'detail',
      label: 'Details',
      type: 'detail',
      detail: this.airfareDetail,
    },
  ];

  TableActions: Array<PoTableAction> = [
    {
      action: this.VotemodalOpen.bind(this),
      icon: 'po-icon-plus',
      label: 'Vote',
    },
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'ISA' }],
  };

  accountPersona: Promise<any> | undefined;
  userType: any;

  constructor(
    public web3: Web3Service,
    private poNotification: PoNotificationService,
    private router: Router,
    private sharedService:SharedService
  ) {
    EventService.get('accountStatus').subscribe((data) => {
      console.log(data);
      if (data) {
        this.getCategories();
      } else {
        this.resetCategories();
      }
    });
  }

  ngOnInit(): void {
    this.web3.loadWeb3();
  }

  modalOpen() {
    this.poModal.open();

    console.log(this.poModal);
  }

  VotemodalOpen(category: any) {
    this.voteModal.open();
    console.log(category);
    this.selectedCategory = category;
  }

  modalClose() {
    this.poModal.close();
    this.formShare.reset();
  }

  voteModalClose() {
    this.voteModal.close();
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

  addVotetoCategory() {
    this.voteModalClose();
    this.loadingCategories = true;
    console.log(this.selectedCategory);
    this.web3
      .categoryVote(this.selectedCategory?.id)
      .then((res) => {
        console.log(res);

        if (res.transactionHash) {
          this.getCategories();
          this.selectedCategory = new CategoryTable();
        }
      })
      .catch((err) => {
        this.poNotification.error(err);
        this.loadingCategories = false;
      });
  }

  async createCategory() {
    console.log(this.formShare.value);

    if (!this.formShare.invalid) {
      /**/ this.web3
        .createCategories(
          this.formShare.controls['categoryName']?.value,
          this.formShare.controls['categoryDescriptio']?.value,
          this.formShare.controls['totallySustainable']?.value,
          this.formShare.controls['partiallySustainable']?.value,
          this.formShare.controls['neutro']?.value,
          this.formShare.controls['partiallyNotSustainable']?.value,
          this.formShare.controls['totallyNotSustainable']?.value
        )
        .then((res) => {
          if (res) {
            console.log(res);
            this.getCategories();
          }
        });
    }
    this.modalClose();
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
      return false;
    }
  }

  async getCategories() {
    this.checkAccount().then(async (e) => {
      this.loadingCategories = true;

      console.log(e);

      if (e) {
        this.web3.getUser().then((res) => {
          console.log(res);

          this.userType = res;

          switch (res) {
            case '0':
              console.log('new register');
              this.router.navigate(['dashboard/register']);
              break;

            case '1':
              this.accountPersona = this.web3.getProducer().then((res) => {
                console.log(res);
                EventService.get('accountRole').emit('Producer')
                this.sharedService.accountRole = 'Producer'
              });
              break;

            case '2':
              this.accountPersona = this.web3.getActivist().then((res) => {
                console.log(res);
                EventService.get('accountRole').emit('Activist')
                this.sharedService.accountRole = 'Activist'
              });
              break;
          }
        });

        this.web3
          .getCategories()
          .then((res) => {
            if (res) {
              this.items = [];
              this.categoriesArray = res;
              console.log(this.categoriesArray);

              for (let i = 0; i < this.categoriesArray.length; i++) {
                let initialChars = this.categoriesArray[i]['createdBy'];

                let _createdBy = `${initialChars.substring(
                  0,
                  5
                )}...${initialChars.substring(
                  initialChars.length - 5,
                  initialChars.length
                )}`;
                this.items.push({
                  _createdBy: _createdBy,
                  createdBy: this.categoriesArray[i]['createdBy'],
                  name: this.categoriesArray[i]['name'],
                  id: this.categoriesArray[i]['id'],
                  index: this.categoriesArray[i]['index'],
                  description: this.categoriesArray[i]['description'],
                  votesCount: this.categoriesArray[i]['votesCount'],
                  detail: [
                    {
                      totallySustainable:
                        this.categoriesArray[i]['totallySustainable'],
                      partiallySustainable:
                        this.categoriesArray[i]['partiallySustainable'],
                      neutro: this.categoriesArray[i]['neutro'],
                      totallyNotSustainable:
                        this.categoriesArray[i]['totallyNotSustainable'],
                      partiallyNotSustainable:
                        this.categoriesArray[i]['partiallyNotSustainable'],
                    },
                  ],
                });

                console.log(this.items);
              }

              setTimeout(() => {
                this.loadingCategories = false;
              }, 200);
            }
          })
          .catch((err) => {
            console.log(err);
            this.loadingCategories = false;
            this.poNotification.error(err);
          });
      } else {
        this.loadingCategories = false;
      }
    });
  }

  resetCategories() {
    this.items = [];
    this.categoriesArray = [];
  }
}
