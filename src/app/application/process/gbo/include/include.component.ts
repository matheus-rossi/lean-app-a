import { Component, OnInit, ViewChild } from '@angular/core';
import { 
  PoTableComponent, 
  PoModalComponent, 
  PoDialogService 
  } 
from '@po-ui/ng-components';

import { 
  PoTableColumn
} from '@po-ui/ng-components';

@Component({
  selector: 'app-gbo-include',
  templateUrl: './include.component.html',
  styleUrls: ['./include.component.css']
})
export class GboIncludeComponent implements OnInit {

  constructor(private poDialog: PoDialogService) { }

  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  ngOnInit(): void {
  }

  public readonly columns: Array<PoTableColumn> = [
    { property: 'takt', type: 'number', label: 'Takt' },
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

  deleteOperation () {
    const selectedItems = this.poTable.getSelectedRows();

    if (selectedItems.length > 0) {
      this.poDialog.confirm({
        title: 'Remover itens',
        literals: { cancel: 'Cancelar', confirm: 'Sim' },
        message: `Você gostaria de remover esses ${selectedItems.length} itens da lista?`,
        confirm: () => alert('feito'),
        cancel: () => {}
      });
    }
  }

}
