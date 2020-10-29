import { Component, OnInit } from '@angular/core';
import { PoPageAction } from '@po-ui/ng-components';
import { PoTableColumn } from '@po-ui/ng-components';

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
    { label: 'Ajuda', url:'https://google.com.br', icon: 'po-icon-help' },
    { label: 'Importar', action: this.modalOpen.bind(this), icon: 'po-icon-upload' }
  ];

  modalOpen() {
    alert(this.columns)
  }

  readonly columns: Array<PoTableColumn> = [
    { property: 'takt', type: 'number', width: '8%', label: 'Takt' },
    { property: 'work_center', label: 'Centro Trabalho' },
    { property: 'description', label: 'Descrição Atividade' },
    { property: 'time', label: 'Tempo' }
  ]

  readonly items: Array<any> = [
    {
      takt: 50,
      work_center: 'Pré-Montagem',
      description: 'Operação 1',
      time: 32,
    },
    {
      takt: 50,
      work_center: 'Pré-Montagem',
      description: 'Operação 2',
      time: 32,
    },
    {
      takt: 50,
      work_center: 'Montagem',
      description: 'Operação Final',
      time: 40
    }
  ]

}
