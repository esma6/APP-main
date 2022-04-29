import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { ClipboardService } from 'ngx-clipboard';
import { checkContractService } from 'src/app/data/services/checkContract.service';
import { Web3Service } from 'src/app/data/services/web3.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {


  accountWallet!: string | null;
  public loadingCertificate: boolean = false;
  accountDetails: any | null;
  accountRole!: string;


  constructor(    private route: ActivatedRoute,
    private poNotification: PoNotificationService,
    private router: Router,
    private checkAccount: checkContractService,
    private web3: Web3Service,
    private location: Location,
    private clipboardApi: ClipboardService) { }

  ngOnInit(): void {

    this.accountWallet = this.route.snapshot.paramMap.get('id');
    console.log(this.accountWallet)
  }


  getAccount(){
    this.web3.producerExists().then((res) => {
      console.log(res);
      if (!res) {
        this.web3.activistExists().then((res) => {
          console.log(res);
          if (!res) {
            this.loadingCertificate = false;
            this.router.navigate(['dashboard/register']);
          } else {
            this.loadingCertificate = false;
            this.web3.getActivist().then((res) => {
              this.accountRole = 'Activist';
              this.accountDetails = res;
            });
          }
        });
      } else {
        this.loadingCertificate = false;
        this.web3.getProducer().then((res) => {
          this.accountRole = 'Producer';

          this.accountDetails = res;
        });
      }
    });
  }
}
