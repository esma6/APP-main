import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoInfoOrientation, PoListViewAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { checkContractService } from 'src/app/data/services/checkContract.service';
import { Web3Service } from 'src/app/data/services/web3.service';
import * as htmlToImage from 'html-to-image';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss'],
})
export class CertificationComponent implements OnInit {
  @ViewChild('Certificate') container?: ElementRef;
  @ViewChild('inspectionModal') inspectionModal!: PoModalComponent;

  accountWallet!: string | null;
  public loadingCertificate: boolean = false;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'certificate' }],
  };

  accountDetails: any | null;
  accountRole!: string;
  orientation:PoInfoOrientation = PoInfoOrientation.Horizontal
  title = 'app';
  elementType:any = 'url';
  value = '';

  readonly actions: Array<PoListViewAction> = [
    {
      label: `See account detail`,
      action: this.seeDetail.bind(this),
      icon: 'po-icon po-icon-eye',
    },
  ];
  inpectionAccount: any;
  categories: any;

  IsaStatus = [
    'Totally Sustainable',
    'Partially Sustainable',
    'Neutro',
    'Partially Not Sustainable',
    'Totally Not Sustainable',
  ];
  inspections: any;
  isaScore: number = 0;
  constructor(
    private route: ActivatedRoute,
    private poNotification: PoNotificationService,
    private router: Router,
    private checkAccount: checkContractService,
    private web3: Web3Service,
    private location: Location,
    private clipboardApi: ClipboardService
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
    this.loadingCertificate = true;
    this.checkAccount.checkAccount().then((acc) => {
      if (acc) {

        this.web3.getUser().then((res) => {
          console.log(res);
          this.getCategories();
          switch (res) {
            case '0':
              console.log('new register')
              this.router.navigate(['dashboard/register']);
              this.loadingCertificate = false;
              break;

            case '1':
             this.web3.getProducer().then((res) => {
              this.accountRole = 'Producer';

              this.accountDetails = res;
              this.value =`http:localhost:4200${this.router.url}`;
              this.loadingCertificate = false;
              this.getInspectionsHistory();
              });
              break;

            case '2':
         this.web3.getActivist().then((res) => {
                this.accountRole = 'Activist';
                this.accountDetails = res;
                this.value =`http:localhost:4200${this.router.url}`;
                this.loadingCertificate = false;
                this.getInspectionsHistory();
              });
              break;
          }
        });


        console.log(this.accountDetails);
      } else {
        this.loadingCertificate = false;
      }
    });
  }


  saveImage(){

    const image:any = this.container
    console.log(image)
    htmlToImage.toJpeg(image.nativeElement).then((res)=>{
      const link = document.createElement('a')
      link.download = `Certificate_${this.accountWallet}`
      link.href = res;
      link.click()
    })
  }

  copyUrl(){
    this.clipboardApi.copyFromContent(`http:localhost:4200${this.router.url}`)
    this.poNotification.success('copied successfully!')
  }

  sendCertificateByEmail(){
    this.poNotification.success('Email sent successfully!')
  }



  getInspectionsHistory() {
    let isaScore = 0;
    this.web3.getInspectionsHistory().then((res) => {

      this.inspections = res.map((item: any) =>
        Object.assign({}, item, {
          date: new Date(item.createdAt * 1000).toLocaleDateString('pt-Br'),
          result:[]
        })
      );

      for (let i = 0; i < this.inspections.length; i++) {
        isaScore += parseInt(this.inspections[i].isaPoints);
        for (let index = 0; index < this.inspections[i].isas.length; index++) {
          this.inspections[i].result.push({
            categorie:this.categories[this.inspections[i].isas[index][0]-1],
            value: this.IsaStatus[this.inspections[i].isas[index][1]]
          })
        }

      }
      this.isaScore = isaScore;
console.log(this.inspections)
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

  async getCategories() {
    this.web3.getCategories().then((res) => {
      this.categories = res;
    });
  }
}
