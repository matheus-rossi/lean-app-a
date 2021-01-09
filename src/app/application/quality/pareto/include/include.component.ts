import {
  Component,
  OnInit,
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
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-pareto-include',
  templateUrl: './include.component.html',
  styleUrls: ['./include.component.css']
})
export class ParetoIncludeComponent implements OnInit {

  description: string;
  quantity: number;
  itemsAr: any;

  readonly columns: Array<PoTableColumn> = [
    { property: 'description', type: 'string', label: 'Descrição' },
    { property: 'quantity', type: 'number', label: 'Quantidade' }
  ];

  items: Array<any> = [
    {
      description: 'Objeto de Estudo 1',
      quantity: 80
    },
    {
      description: 'Objeto de Estudo 2',
      quantity: 200
    },
    {
      description: 'Objeto de Estudo 3',
      quantity: 50
    }
  ];

  constructor(
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService
  ) { }

  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  ngOnInit(): void {
    this.items.sort(this.compareItems);
    this.itemsAr = this.paretoCalculation(this.items);
    this.generateChart();
  }

  addOperation(): void {

    if (this.description && this.quantity !== null) {
      const data = this.items;
      const index = data.map( d => d.description ).indexOf(this.description);
      if (index === -1) {
        const newItem = {
          description: this.description,
          quantity: this.quantity
        };
        this.items.push(newItem);
        this.items.sort(this.compareItems);
        this.itemsAr = this.paretoCalculation(this.items);
      }
      this.resetItems();
      this.generateChart();
    } else {
      const poNotification: PoNotification = {
        message: 'Campos inválidos, favor verificar as informações',
        duration: 3000
      };

      this.poNotification.warning(poNotification);
    }
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
          this.generateChart();
        },
        cancel: () => {}
      });
    }
  }

  removeSelectedItems(selectedItems): void {
    this.items = this.items.filter(item => !selectedItems.includes(item));
    this.itemsAr = this.paretoCalculation(this.items);
  }

  compareItems(a, b): number {
    if (a.quantity > b.quantity) {
      return -1;
    }
    if (a.quantity < b.quantity) {
      return 1;
    }
    return 0;
  }

  resetItems(): void {
    this.description = null;
    this.quantity = null;
  }

  paretoCalculation(paretoAr): object {
    const paretoArray = paretoAr.sort(this.compareItems);
    const patternX = [
      ['x']
    ];
    const patternQtd = [
      ['Quantidade']
    ];
    const patternAcc = [
      ['% Acumulado']
    ];
    const patternXFinal = paretoArray.map(item => item.description);
    const patternQtdFinal = paretoArray.map(item => item.quantity);
    const totalPercent = patternQtdFinal.reduce((acc, curr) => acc + curr, 0);
    const itemPercent = patternQtdFinal.map(item => Math.round((item / totalPercent) * 100));
    const patternAccAlmost = itemPercent
      .reduce((r, c, i) => {
        r.push((r[i - 1] || 0) + c);
        return r;
      }, []);
    const finalPatternAcc = _.flattenDeep(patternAcc.concat(patternAccAlmost));
    const finalPatternX = _.flattenDeep(patternX.concat(patternXFinal));
    const finalPatternQtd = _.flattenDeep(patternQtd.concat(patternQtdFinal));
    return {
      finalPatternX,
      finalPatternQtd,
      finalPatternAcc
    };
  }

  generateChart(): void {
    setTimeout(() => {
      return c3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
          columns: [
            this.itemsAr.finalPatternX,
            this.itemsAr.finalPatternQtd,
            this.itemsAr.finalPatternAcc
          ],
          type: 'bar',
          types: {
            '% Acumulado': 'spline'
          },
          axes: {
            '% Acumulado': 'y2'
          }
        },
        axis: {
          x: {
            type: 'category',
            tick: {
              rotate: 90,
              multiline: false
            }
          },
          y2: {
            show: true,
            min: 10,
            max: 100
          }
        },
        grid: {
          y: {
            lines: [
              {
                value: 80,
                text: '80% das Ocorrências',
                // @ts-ignore
                axis: 'y2'
              }
            ]
          }
        }
      });
    }, 50);
  }

}
