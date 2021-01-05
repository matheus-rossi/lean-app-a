import { Component, OnInit } from '@angular/core';

import {
  PoTableColumn,
  PoNotification,
  PoNotificationService
} from '@po-ui/ng-components';

@Component({
  selector: 'app-oee-include',
  templateUrl: './include.component.html',
  styleUrls: ['./include.component.css']
})
export class OeeIncludeComponent implements OnInit {

  readonly columns: Array<PoTableColumn> = [
    {
      property: 'status',
      type: 'label',
      label: 'Meu Resultado',
      labels: [
        { value: '01', color: 'color-07', label: 'Aqui' },
        { value: '02', color: 'color-08', label: 'Aqui' },
        { value: '03', color: 'color-04', label: 'Aqui' },
        { value: '04', color: 'color-11', label: 'Aqui' }
      ]
    },
    {
      property: 'description',
      type: 'string',
      label: 'Descrição'
    }
  ];

  items: Array<any> = [
    {
      description: 'de 0% até 30% -- Sistema de produção com performance baixa',
      status: ''
    },
    {
      description: 'acima de 30% até 60% -- Sistema de produção com performance normal',
      status: ''
    },
    {
      description: 'acima de 60% até 90% -- Sistema de produção com performance alta',
      status: ''
    },
    {
      description: 'acima de 90% -- Sistema de produção com performance excelente',
      status: ''
    }
  ];

  totalAvaliableTime: number;
  totalPlannedStopsTime: number;
  totalUnplannedStopsTime: number;
  totalScheduledTime: number;
  totalProductiveTime: number;
  totalNonConformingPartsTime: number;

  availabilityRate: number;
  performanceRate: number;
  quailityRate: number;

  oeeRate: number;

  showResult = false;

  constructor(
    private poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
  }

  insertOee(): void {
    if (this.totalAvaliableTime && this.totalNonConformingPartsTime && this.totalPlannedStopsTime &&
        this.totalProductiveTime && this.totalScheduledTime && this.totalUnplannedStopsTime != null) {
      this.oeeCalculation();
    } else {
      this.oeeError();
    }
  }

  oeeCalculation(): void {
    const scheduled = this.totalAvaliableTime - this.totalPlannedStopsTime;
    const avaliableRate = (scheduled - this.totalUnplannedStopsTime) / scheduled;
    const actualUptime = scheduled - this.totalUnplannedStopsTime;
    const performanceRate = actualUptime / scheduled;
    const qualityRate = this.totalNonConformingPartsTime / this.totalProductiveTime;
    this.oeeRate = Math.floor((avaliableRate * performanceRate * (1 - qualityRate)) * 100);

    if (this.oeeRate < 30) {
      this.items[0].status = '01';
      this.items[1].status = '';
      this.items[2].status = '';
      this.items[3].status = '';
    } else if (this.oeeRate >= 30 && this.oeeRate <= 60) {
      this.items[0].status = '';
      this.items[1].status = '02';
      this.items[2].status = '';
      this.items[3].status = '';
    } else if (this.oeeRate > 60 && this.oeeRate <= 90) {
      this.items[0].status = '';
      this.items[1].status = '';
      this.items[2].status = '03';
      this.items[3].status = '';
    } else if (this.oeeRate > 90) {
      this.items[0].status = '';
      this.items[1].status = '';
      this.items[2].status = '';
      this.items[3].status = '04';
    }
    this.showResult = true;
  }

  oeeClean(): void {
    this.showResult = false;
    this.oeeRate = undefined;
  }

  oeeError(): void {
      const poNotification: PoNotification = {
        message: 'Campos inválidos, favor verificar as informações',
        duration: 3000
      };

      this.poNotification.warning(poNotification);
  }

}
