import { Component, OnInit } from '@angular/core';
import { PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-gbo',
  templateUrl: './gbo.component.html',
  styleUrls: ['./gbo.component.css']
})
export class GboComponent implements OnInit {

  public readonly actions: Array<PoPageAction> = [
    { label: 'Ajuda', url: 'https://exoconsultoria.com.br/estudo-de-caso-01-gbo/', icon: 'po-icon-help' }
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
