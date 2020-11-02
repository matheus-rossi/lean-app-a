import { Component, OnInit } from '@angular/core';
import { PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-gbo',
  templateUrl: './gbo.component.html',
  styleUrls: ['./gbo.component.css']
})
export class GboComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public readonly actions: Array<PoPageAction> = [
    { label: 'Ajuda', url:'/app/process/gbo/help', icon: 'po-icon-help' },
    { label: 'Incluir', url:'/app/process/gbo/include' },
  ];

}
