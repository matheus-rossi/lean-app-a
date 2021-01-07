import { Component, OnInit } from '@angular/core';
import { PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-smed',
  templateUrl: './smed.component.html',
  styleUrls: ['./smed.component.css']
})
export class SmedComponent implements OnInit {

  public readonly actions: Array<PoPageAction> = [
    { label: 'Ajuda', url: 'https://exoconsultoria.com.br/estudo-de-caso-01-gbo/', icon: 'po-icon-help' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
