import { Component, OnInit } from '@angular/core';
import { PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-oee',
  templateUrl: './oee.component.html',
  styleUrls: ['./oee.component.css']
})
export class OeeComponent implements OnInit {

  public readonly actions: Array<PoPageAction> = [
    { label: 'Ajuda', url: 'https://exoconsultoria.com.br/estudo-de-caso-01-gbo/', icon: 'po-icon-help' }
  ];

  constructor() { }

  ngOnInit(): void {

  }

  changeRouter(this): void {
    console.table(this.attendances);
  }

}
