import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-activists-pool',
  templateUrl: './activists-pool.component.html',
  styleUrls: ['./activists-pool.component.scss']
})
export class ActivistsPoolComponent implements OnInit {

  public loadingActivistPool:boolean =false;
  public accountDetails:any;


  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'activist-pool' }],
  };


  constructor() { }

  ngOnInit(): void {
    this.accountDetails = '123'
  }

}
