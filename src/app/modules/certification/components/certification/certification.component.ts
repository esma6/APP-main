import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService } from '@po-ui/ng-components';
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


  accountWallet!: string | null;
  public loadingCertificate: boolean = false;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'certificate' }],
  };

  accountDetails: any | null;
  accountRole!: string;

  title = 'app';
  elementType:any = 'url';
  value = '';

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
              });
              break;

            case '2':
         this.web3.getActivist().then((res) => {
                this.accountRole = 'Activist';
                this.accountDetails = res;
                this.value =`http:localhost:4200${this.router.url}`;
                this.loadingCertificate = false;
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
}
