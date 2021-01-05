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
import * as _ from 'lodash';

@Component({
  selector: 'app-gbo-include',
  templateUrl: './include.component.html',
  styleUrls: ['./include.component.css']
})

export class GboIncludeComponent implements OnInit, AfterViewInit {

  sequence = 0;
  takt: number;
  workCenter: string;
  description: string;
  time: number;
  lowRepCycle: number;
  chartData: any;

  readonly columns: Array<PoTableColumn> = [
    { property: 'sequence', type: 'number', label: 'Seq.' },
    { property: 'takt', type: 'number', label: 'Takt' },
    { property: 'cycle', type: 'number', label: 'Ciclo' },
    { property: 'workCenter', label: 'Centro Trabalho' },
    { property: 'description', label: 'Descrição Atividade' },
    { property: 'lowRepCycle', label: 'Tempo' }
  ];

  items: Array<any> = [
    {
      sequence: 1,
      takt: 50,
      workCenter: 'Pré-Montagem',
      description: 'Operação 1',
      cycle: 40,
      lowRepCycle: 28
    },
    {
      sequence: 2,
      takt: 50,
      cycle: 40,
      workCenter: 'Pré-Montagem',
      description: 'Operação 2',
      lowRepCycle: 28
    },
    {
      sequence: 3,
      takt: 50,
      cycle: 40,
      workCenter: 'Montagem',
      description: 'Operação Final',
      lowRepCycle: 36
    }
  ];

  constructor(
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService
  ) { }

  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.generateChart();
  }

  addOperation(): void {
    this.sequence += 1;

    const item = {
      sequence: this.sequence,
      takt: this.takt,
      cycle: this.calculateCycleTime(this.takt),
      workCenter: this.workCenter,
      description: this.description,
      lowRepCycle: this.lowRepCycle
    };

    if (this.takt && this.workCenter && this.description && this.lowRepCycle != null) {
      this.items.push(item);

      this.takt = undefined;
      this.workCenter = undefined;
      this.description = undefined;
      this.lowRepCycle = undefined;

    } else {
      const poNotification: PoNotification = {
        message: 'Campos inválidos, favor verificar as informações',
        duration: 3000
      };

      this.poNotification.warning(poNotification);
    }

    this.generateChart();

  }

  calculateCycleTime(takt: number): number {
    return (takt * 0.8);
  }

  deleteOperation(): void {
    const selectedItems = this.poTable.getSelectedRows();

    if (selectedItems.length > 0) {
      this.poDialog.confirm({
        title: 'Remover itens',
        literals: { cancel: 'Cancelar', confirm: 'Sim' },
        message: `Você gostaria de remover esses ${selectedItems.length} itens da lista?`,
        confirm: () => {
          this.removeSelectedItems(selectedItems);
        },
        cancel: () => {}
      });
    }
  }

  generateChartData(data): void {
    this.chartData = this.obcCalc(data);
  }

  generateChart(): void {
    this.chart();
    this.generateChartData(this.items);
  }

  removeSelectedItems(selectedItems): void {
    this.items = this.items.filter(item => !selectedItems.includes(item));
    this.generateChart();
  }

  obcCalc(obc: Array<any>): object {
    const firstCol = [
      ['x']
    ];
    const secondCol = [
      ['# Processo']
    ];
    const thirdCol = [
      ['Takt']
    ];
    const fourthCol = [
      ['Ciclo']
    ];
    const workCenterUniqArray = _.uniq(obc.map(proc => proc.workCenter));
    const finalFirstCol = _.flattenDeep(firstCol.concat(workCenterUniqArray));
    const groups = [];
    for (const row of workCenterUniqArray) {
      const processByBox = obc
        .filter(proc => proc.workCenter === row)
        .map(proc => proc.lowRepCycle)
        .reduce((acc, curr) => acc + curr);
      groups.push(processByBox);
    }
    const finalSecondCol = _.flattenDeep(secondCol.concat(groups));
    const almostFinalThirdCol = [];
    const almostFinalFourthCol = [];
    for (const row of workCenterUniqArray) {
      const processByBox = obc
        .filter(proc => proc.workCenter === row)
        .map(proc => proc.takt);
      almostFinalThirdCol.push(_.uniq(processByBox));
    }
    const finalThirdCol = thirdCol.concat(_.flattenDeep(almostFinalThirdCol));
    for (const row of workCenterUniqArray) {
      const processByBox = obc
        .filter(proc => proc.workCenter === row)
        .map(proc => proc.cycle);
      almostFinalFourthCol.push(_.uniq(processByBox));
    }
    const finalFourthCol = fourthCol.concat(_.flattenDeep(almostFinalFourthCol));
    return {
      finalFirstCol,
      finalSecondCol,
      finalThirdCol,
      finalFourthCol
    };
  }

  chart(): void {
    setTimeout(() => {
      c3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
          columns: [
            this.chartData.finalFirstCol,
            this.chartData.finalSecondCol,
            this.chartData.finalThirdCol,
            this.chartData.finalFourthCol,
          ],
          type: 'bar',
          types: {
            Takt: 'line',
            Ciclo: 'line'
          },
          axes: {
            takt: 'y2'
          }
        },
        legend: {
          position: 'inset'
        },
        axis: {
          x: {
            type: 'category',
            tick: {
              rotate: 75,
              multiline: false
            }
          }
        }
      });
    }, 50);
  }

}
