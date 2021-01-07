import { Component, OnInit } from '@angular/core';

import {
  PoNotification,
  PoNotificationService
} from '@po-ui/ng-components';

@Component({
  selector: 'app-oee-include',
  templateUrl: './include.component.html',
  styleUrls: ['./include.component.css']
})
export class OeeIncludeComponent implements OnInit {

  totalAvaliableTime: number;
  totalPlannedStopsTime: number;
  totalUnplannedStopsTime: number;
  totalScheduledTime: number;
  totalProductiveTime: number;
  totalNonConformingPartsTime: number;

  availabilityRate: number;
  performanceRate: number;
  qualityRate: number;

  oeeRate: number;
  oeeDescription: string;

  showResult = false;

  constructor(
    private poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
  }

  dataChanged(): void {
    if (this.totalAvaliableTime && this.totalPlannedStopsTime && this.totalUnplannedStopsTime !== null) {
      this.totalScheduledTime = this.totalAvaliableTime - this.totalPlannedStopsTime - this.totalUnplannedStopsTime;
    }
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
    const scheduledMinusLosses = this.totalAvaliableTime - this.totalPlannedStopsTime - this.totalUnplannedStopsTime;
    this.availabilityRate = Math.floor((scheduledMinusLosses / this.totalAvaliableTime) * 100);

    this.performanceRate = Math.floor((this.totalProductiveTime / scheduledMinusLosses) * 100);

    this.qualityRate = Math.floor(( 1 - (this.totalNonConformingPartsTime / this.totalProductiveTime)) * 100);

    const tempOeeRate = (this.availabilityRate / 100) * (this.performanceRate / 100) * (this.qualityRate / 100);
    this.oeeRate = Math.round((tempOeeRate + Number.EPSILON) * 100);

    if (this.oeeRate < 30) {
      this.oeeDescription = 'Sistema de produção com performance baixa';
    } else if (this.oeeRate >= 30 && this.oeeRate <= 60) {
      this.oeeDescription = 'Sistema de produção com performance normal';
    } else if (this.oeeRate > 60 && this.oeeRate <= 90) {
      this.oeeDescription = 'Sistema de produção com performance alta';
    } else if (this.oeeRate > 90) {
      this.oeeDescription = 'Sistema de produção com performance excelente';
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
