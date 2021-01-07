import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  PoTableColumn,
  PoTableComponent,
  PoModalComponent,
  PoDialogService,
  PoNotification,
  PoNotificationService
} from '@po-ui/ng-components';

@Component({
  selector: 'app-smed-include',
  templateUrl: './include.component.html',
  styleUrls: ['./include.component.css']
})
export class SmedIncludeComponent implements OnInit {

  operationDescription: string;
  time: number;
  setupType: string;
  canBeExternal: string;

  totalSetupTime = 0;
  smedPercentuaGain = 0;
  smedTimeGain = 0;

  readonly columns: Array<PoTableColumn> = [
    {
      property: 'operationDescription',
      type: 'string',
      label: 'Operação'
    },
    {
      property: 'time',
      type: 'number',
      label: 'Tempo'
    },
    {
      property: 'setupType',
      type: 'label',
      label: 'Tipo Setup',
      labels: [
        { value: '01', color: 'color-07', label: 'Interno' },
        { value: '02', color: 'color-11', label: 'Externo' }
      ]
    },
    {
      property: 'canBeExternal',
      type: 'label',
      label: 'É ou Pode ser Externalizado?',
      labels: [
        { value: '01', color: 'color-11', label: 'Sim' },
        { value: '02', color: 'color-07', label: 'Não' }
      ]
    }
  ];

  items: Array<any> = [
    {
      operationDescription: 'Buscar ferramentas na caixa',
      time: 12,
      setupType: '02',
      canBeExternal: '02'
    },
    {
      operationDescription: 'Soltar componente x',
      time: 15,
      setupType: '01',
      canBeExternal: '02'
    },
    {
      operationDescription: 'Limpar ferramentas',
      time: 20,
      setupType: '01',
      canBeExternal: '01'
    }
  ];

  constructor(
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService
  ) { }

  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  ngOnInit(): void {
    this.calculateSmedGain();
  }

  addItems(): void {

    const item = {
      operationDescription: this.operationDescription,
      time: this.time,
      setupType: this.setupType,
      canBeExternal: this.canBeExternal
    };

    if (this.operationDescription && this.time && this.setupType && this.canBeExternal !== null) {
      this.items.push(item);
      this.calculateSmedGain();
    } else {
      const poNotification: PoNotification = {
        message: 'Campos inválidos, favor verificar as informações',
        duration: 3000
      };

      this.poNotification.warning(poNotification);
    }
  }

  deleteItens(): void {
    const selectedItems = this.poTable.getSelectedRows();

    if (selectedItems.length > 0) {
      this.poDialog.confirm({
        title: 'Remover itens',
        literals: { cancel: 'Cancelar', confirm: 'Sim' },
        message: `Você gostaria de remover esses ${selectedItems.length} itens da lista?`,
        confirm: () => {
          this.removeSelectedItems(selectedItems);
          this.calculateSmedGain();
        },
        cancel: () => {}
      });
    }
  }

  calculateSmedGain(): void {
    const totalSetup = this.items.reduce((sum, operationTime) => {
      return sum + operationTime.time;
    }, 0);
    const totalCanBeExternalSetup = this.items.filter(item => {
      return item.setupType === '01' && item.canBeExternal === '01';
    }).reduce((sum, operationTime) => {
      return sum + operationTime.time;
    }, 0);

    this.smedTimeGain = totalCanBeExternalSetup;
    const tempSmedPercentualGain = totalCanBeExternalSetup / totalSetup;
    this.smedPercentuaGain = Math.round((tempSmedPercentualGain + Number.EPSILON) * 100);
    this.totalSetupTime = totalSetup;
  }

  removeSelectedItems(selectedItems): void {
    this.items = this.items.filter(item => !selectedItems.includes(item));
  }

}
