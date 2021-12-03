import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-researcher-pool',
  templateUrl: './researcher-pool.component.html',
  styleUrls: ['./researcher-pool.component.scss']
})
export class ResearcherPoolComponent implements OnInit {


  public loadingResearcherPool:boolean =false;
  public accountDetails:any;


  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'Researcher-pool' }],
  };

  constructor() { }

  ngOnInit(): void {
    this.accountDetails = '123'
  }
}
