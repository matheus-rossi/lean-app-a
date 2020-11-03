import { 
  Component, 
  OnInit, 
  ViewChild 
} from '@angular/core';

import { 
  PoTableComponent, 
  PoModalComponent, 
  PoDialogService,
  PoTableColumn
} from '@po-ui/ng-components';

@Component({
  selector: 'app-gbo-include',
  templateUrl: './include.component.html',
  styleUrls: ['./include.component.css']
})
export class GboIncludeComponent implements OnInit {

  takt: number;
  work_center: string;
  description: string;
  time: number;
  cycle: number;

  constructor(private poDialog: PoDialogService) { }

  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  ngOnInit(): void {
  }

  readonly columns: Array<PoTableColumn> = [
    { property: 'takt', type: 'number', label: 'Takt' },
    { property: 'cycle', type: 'number', label: 'Ciclo' },
    { property: 'work_center', label: 'Centro Trabalho' },
    { property: 'description', label: 'Descrição Atividade' },
    { property: 'time', label: 'Tempo' }
  ]

  
  items: Array<any> = [
    {
      takt: 50,
      work_center: 'Pré-Montagem',
      description: 'Operação 1',
      time: 32,
      cycle: 28
    },
    {
      takt: 50,
      work_center: 'Pré-Montagem',
      description: 'Operação 2',
      time: 32,
      cycle: 28
    },
    {
      takt: 50,
      work_center: 'Montagem',
      description: 'Operação Final',
      time: 40,
      cycle: 36
    }
  ]

  addOperation () {
    let item = {
      takt: this.takt,
      work_center: this.work_center,
      description: this.description,
      time: this.time,
      cycle: this.calcCycle(this.time)
    }

    if (this.takt && this.work_center && this.description && this.time != null) {
      this.items.push(item);

      this.takt = null;
      this.work_center = null;
      this.description = null;
      this.time = null;
      this.cycle = null;

    } else {
      alert('Campos Vazios')
    }


  }

  calcCycle (takt: number) {
    return (takt * 0.8).toFixed(2);
  }

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
