import { 
  Component, 
  OnInit, 
  AfterViewInit,
  ViewChild 
} from '@angular/core';

import { 
  PoTableComponent, 
  PoModalComponent, 
  PoDialogService,
  PoTableColumn,
  PoNotification,
  PoNotificationService
} from '@po-ui/ng-components';

import * as c3 from 'c3';

@Component({
  selector: 'app-gbo-include',
  templateUrl: './include.component.html',
  styleUrls: ['./include.component.css']
})

export class GboIncludeComponent implements OnInit, AfterViewInit {

  takt: number;
  work_center: string;
  description: string;
  time: number;
  cycle: number;

  constructor(
    private poDialog: PoDialogService, 
    private poNotification: PoNotificationService
  ) { }

  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let chart = c3.generate({
      bindto: '#chart',
          data: {
              columns: [
                  ['data1', 30, 200, 100, 400, 150, 250],
                  ['data2', 50, 20, 10, 40, 15, 25]
              ]
          }
    });
    console.log(this.items)
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
      takt: (this.takt).toFixed(2),
      work_center: this.work_center,
      description: this.description,
      time: (this.time).toFixed(2),
      cycle: this.calculateCycleTime(this.time)
    }

    if (this.takt && this.work_center && this.description && this.time != null) {
      this.items.push(item);

      this.takt = undefined;
      this.work_center = undefined;
      this.description = undefined;
      this.time = undefined;
      this.cycle = undefined;

    } else {
      const poNotification: PoNotification = {
        message: 'Campos inválidos, favor verificar as informações',
        duration: 3000
      };

      this.poNotification.warning(poNotification);
    }


  }

  calculateCycleTime (takt: number) {
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
