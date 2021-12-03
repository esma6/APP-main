import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-producer-pool',
  templateUrl: './producer-pool.component.html',
  styleUrls: ['./producer-pool.component.scss']
})
export class ProducerPoolComponent implements OnInit {

  public loadingProducerPool:boolean =false;
  public accountDetails:any;


  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'producer-pool' }],
  };

  constructor() { }

  ngOnInit(): void {
    this.accountDetails = '123'
  }
}
