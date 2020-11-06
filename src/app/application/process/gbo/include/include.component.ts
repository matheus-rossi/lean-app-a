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

  takt: number;
  workCenter: string;
  description: string;
  time: number;
  lowRepCycle: number;
  chartData: any;

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

  readonly columns: Array<PoTableColumn> = [
    { property: 'takt', type: 'number', label: 'Takt' },
    { property: 'cycle', type: 'number', label: 'Ciclo' },
    { property: 'workCenter', label: 'Centro Trabalho' },
    { property: 'description', label: 'Descrição Atividade' },
    { property: 'lowRepCycle', label: 'Tempo' }
  ]

  
  items: Array<any> = [
    { 
      takt: 50, 
      workCenter: 'Pré-Montagem', 
      description: 'Operação 1', 
      cycle: 40,
      lowRepCycle: 28 
    },
    { 
      takt: 50, 
      cycle: 40,
      workCenter: 'Pré-Montagem', 
      description: 'Operação 2', 
      lowRepCycle: 28 },
    { 
      takt: 50,
      cycle: 40, 
      workCenter: 'Montagem', 
      description: 'Operação Final', 
      lowRepCycle: 36 }
  ]

  addOperation () {
    let item = {
      takt: this.takt,
      cycle: this.calculateCycleTime(this.takt),
      workCenter: this.workCenter,
      description: this.description,
      lowRepCycle: this.lowRepCycle
    }

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

  generateChartData (data) {
    this.chartData = this.obcCalc(data)
  }

  generateChart () {
    this.chart();
    this.generateChartData(this.items);
  }

  obcCalc (obc:Array<any>) {
    const firstCol = [
      ['x']
    ]
    const secondCol = [
      ['# Processo']
    ]
    const thirdCol = [
      ['Takt']
    ]
    const fourthCol = [
      ['Ciclo']
    ]
    const workCenterUniqArray = _.uniq(obc.map(proc => proc.workCenter))
    const finalFirstCol = _.flattenDeep(firstCol.concat(workCenterUniqArray))
    const groups = []
    for (let i = 0; i < workCenterUniqArray.length; i++) {
      const processByBox = obc
        .filter(proc => proc.workCenter === workCenterUniqArray[i])
        .map(proc => proc.lowRepCycle)
        .reduce((acc, curr) => acc + curr)
      groups.push(processByBox)
    }
    const finalSecondCol = _.flattenDeep(secondCol.concat(groups))
    const almostFinalThirdCol = []
    const almostFinalFourthCol = []
    for (let i = 0; i < workCenterUniqArray.length; i++) {
      const processByBox = obc
        .filter(proc => proc.workCenter === workCenterUniqArray[i])
        .map(proc => proc.takt)
      almostFinalThirdCol.push(_.uniq(processByBox))
    }
    const finalThirdCol = thirdCol.concat(_.flattenDeep(almostFinalThirdCol))
    for (let i = 0; i < workCenterUniqArray.length; i++) {
      const processByBox = obc
        .filter(proc => proc.workCenter === workCenterUniqArray[i])
        .map(proc => proc.cycle)
      almostFinalFourthCol.push(_.uniq(processByBox))
    }
    const finalFourthCol = fourthCol.concat(_.flattenDeep(almostFinalFourthCol))
    return {
      finalFirstCol,
      finalSecondCol,
      finalThirdCol,
      finalFourthCol
    }
  }

  chart () {
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
      })
    }, 50)
  }

}
