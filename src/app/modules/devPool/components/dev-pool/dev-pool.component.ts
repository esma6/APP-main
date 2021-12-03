import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-dev-pool',
  templateUrl: './dev-pool.component.html',
  styleUrls: ['./dev-pool.component.scss']
})
export class DevPoolComponent implements OnInit {


  public loadingDeveloperPool:boolean =false;
  public accountDetails:any;


  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'Developer-pool' }],
  };

  constructor() { }

  ngOnInit(): void {
    this.accountDetails = '123'
  }

}
