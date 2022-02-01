import { Web3Service } from './../../../data/services/web3.service';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  PoMenuItem,
  PoToolbarAction,
  PoToolbarProfile,
} from '@po-ui/ng-components';
import { EventService } from 'src/app/data/services/event.service';
import { StorageService } from 'src/app/data/services/storage.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/data/services/shared.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  menuItemSelected: string = '';
  accountNumber: string = '';
  profile: PoToolbarProfile = {
    avatar: 'http://lorempixel.com.br/140/140/?1',
    subtitle: 'sintrop.com',
    title: 'Sintrop',
  };

  conectAccountStatus: string = this.web3.account?'Disconnect Account': 'Connect Account';

  profileActions: Array<PoToolbarAction> = [

    {
      icon: 'po-icon-settings',
      label: 'Account',
      action: (item: any) => this.showAction(item),
    },
    {
      icon: 'po-icon-company',
      label: 'Company data',
      action: (item: any) => this.showAction(item),
    },
    {
      icon: 'po-icon-exit',
      label: this.conectAccountStatus,
      action: (item: any) => this.showAction(item),
    }


  ];

  actions: Array<PoToolbarAction> | undefined;
  actionsIcon: string | undefined;
  constructor(private web3: Web3Service,private cdRef: ChangeDetectorRef,
    private storage:StorageService,private router: Router,
    private sharedService:SharedService) {

    EventService.get('accountStatus').subscribe((data) => {
      console.log(data);
      if (data) {
        this.accountNumber = this.web3.account[0];
        this.profileActions[2].label = 'Disconnect Account';
        this.cdRef.detectChanges();
      }else{
        this.router.navigate([''])
      }
    });


  }
@ViewChild('iconTemplate', { static: true } ) iconTemplate : TemplateRef<void> | undefined;
@ViewChild('iconTemplate1', { static: true } ) iconTemplate1 : TemplateRef<void> | undefined;
@ViewChild('iconTemplate2', { static: true } ) iconTemplate2 : TemplateRef<void> | undefined;
@ViewChild('iconTemplate3', { static: true } ) iconTemplate3 : TemplateRef<void> | undefined;
@ViewChild('iconTemplate4', { static: true } ) iconTemplate4 : TemplateRef<void> | undefined;
@ViewChild('iconTemplate5', { static: true } ) iconTemplate5 : TemplateRef<void> | undefined;
@ViewChild('iconTemplate6', { static: true } ) iconTemplate6 : TemplateRef<void> | undefined;
@ViewChild('iconTemplate7', { static: true } ) iconTemplate7 : TemplateRef<void> | undefined;
@ViewChild('iconTemplate8', { static: true } ) iconTemplate8 : TemplateRef<void> | undefined;

  ngOnInit(): void {
    this.web3.loadWeb3();
    this.menus[0].icon = this.iconTemplate
    this.menus[1].icon = this.iconTemplate1
    this.menus[2].icon = this.iconTemplate2
    this.menus[3].icon = this.iconTemplate3
    this.menus[4].icon = this.iconTemplate4
    this.menus[5].icon = this.iconTemplate5
    this.menus[6].icon = this.iconTemplate6
    this.menus[7].icon = this.iconTemplate7

    console.log(  this.menus[7].subItems)

    if (this.web3.account && this.web3.account[0]) {
      this.accountNumber = this.web3.account[0];
      this.profileActions[2].label = 'Disconnect Account';
    }else{
      this.router.navigate(['dashboard/isa'])
    }


  }

  menus: Array<PoMenuItem> = [
    {
      label: 'ISA',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon-clock',
      shortLabel: 'ISA'
    },

    {
      label: 'Inspections',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon-user',
      shortLabel: 'Inspections',
    },
    {
      label: 'Accepted Inspection',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon-user',
      shortLabel: 'Inspection',
    },
    {
      label: 'Producers',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon-user',
      shortLabel: 'Producers',
    },
    {
      label: 'Activists',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon-user',
      shortLabel: 'Activists',
    },
    {
      label: 'My Account',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon-user',
      shortLabel: 'Account',
    },

    {
      label: 'Certificate',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon-user',
      shortLabel: 'Certificate',
    },


    {
      label: 'Pools',
      icon: 'po-icon-share',
      shortLabel: 'Pools',
      subItems: [
        {
          label: 'Producer Pool',
          action: this.printMenuAction.bind(this),
          shortLabel: 'Producer Pool',
          id:'Producer Pool',
          icon: 'fa fa-podcast'
        },


        {
          label: 'Activist Pool',
          action: this.printMenuAction.bind(this),
          icon: 'fa fa-podcast',
          shortLabel: 'Activist Pool',
        },


        {
          label: 'Dev Pool',
          action: this.printMenuAction.bind(this),
          icon: 'fa fa-podcast',
          shortLabel: 'Dev Pool',
        },


        {
          label: 'Researcher Pool',
          action: this.printMenuAction.bind(this),
          icon: 'fa fa-podcast',
          shortLabel: 'Researcher Pool',
        },
      ]
    },
  ];

  /*  {
      label: 'Register Account',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon-user',
      shortLabel: 'Register',
    }, */

  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
    console.log(menu);
    if (menu.shortLabel == 'Register') {
      this.router.navigate(['dashboard/register'])
    }
    if (menu.shortLabel == 'ISA') {
      this.router.navigate(['dashboard/'])
    }
    if (menu.shortLabel == 'Inspections') {
      this.router.navigate(['dashboard/new-inspection'])
    }
    if (menu.shortLabel == 'Inspection') {
      this.router.navigate(['dashboard/realize-inspection'])
    }
    if (menu.shortLabel == 'Producers') {
      this.router.navigate(['dashboard/producer-ranking'])
    }
    if (menu.shortLabel == 'Activists') {
      this.router.navigate(['dashboard/activist-ranking'])
    }
    if (menu.shortLabel == 'Account') {
      this.router.navigate([`dashboard/account/${this.accountNumber}`])
    }

    if (menu.shortLabel == 'Certificate') {
      this.router.navigate([`dashboard/certificate/${this.accountNumber}`])
    }
    if (menu.label == "Producer Pool") {
      this.router.navigate([`dashboard/producer-pool/${this.accountNumber}`])
    }

    if (menu.label == 'Activist Pool') {
      this.router.navigate([`dashboard/activist-pool/${this.accountNumber}`])
    }
    if (menu.label == 'Dev Pool') {
      this.router.navigate([`dashboard/developers-pool/${this.accountNumber}`])
    }
    if (menu.label == 'Researcher Pool') {
      this.router.navigate([`dashboard/researcher-pool/${this.accountNumber}`])
    }



  }

  showAction(e: any) {
    console.log(e);

    if (e.label == 'Connect Account') {
      this.web3.connectMetaMaskAccount().then((res) => {
        if (res) {
          this.accountNumber = res[0];
          this.profileActions[2].label = 'Disconnect Account';
          this.cdRef.detectChanges();

          EventService.get('accountStatus').emit(true)
        }
      });
    }

    if (e.label == 'Disconnect Account') {
      console.log('Disconnect Account')

      this.web3.disconnectMetaMaskAccount().then(res=>{
        if (res) {
          this.accountNumber = ''
          this.profileActions[2].label = 'Connect Account';

          this.storage.storageRemove('metaToken').then(()=>{


            EventService.get('accountStatus').emit(false);
          })
         // this.cdRef.detectChanges();
        }
      })
    }

    if(e.label == 'Account'){
      this.router.navigate([`dashboard/account/${this.accountNumber}`])
    }
  }
}
