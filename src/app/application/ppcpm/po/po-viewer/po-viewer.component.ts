import { Component, OnInit } from '@angular/core';

import {
  PoTableColumn,
} from '@po-ui/ng-components';


@Component({
  selector: 'app-po-viewer',
  templateUrl: './po-viewer.component.html',
  styleUrls: ['./po-viewer.component.css']
})
export class PoViewerComponent implements OnInit {

  readonly columns: Array<PoTableColumn> = [
    {
      property: 'status',
      type: 'label',
      labels: [
        { value: '01', color: 'color-11', label: 'No Prazo' },
        { value: '02', color: 'color-08', label: 'Vencendo' },
        { value: '03', color: 'color-07', label: 'Vencido' }
      ]
    },
    { property: 'po', type: 'string', label: 'OP' },
    { property: 'company', type: 'string', label: 'Filial' },
    { property: 'productCode', label: 'Cód. Produto' },
    { property: 'productDescription', label: 'Desc Produto.' },
    { property: 'orderQuantity', label: 'Qtd Solicitada' },
    { property: 'orderQuantityDelivered', label: 'Qtd Atendida' },
    { property: 'warehouse', label: 'Armazém' },
    { property: 'resource', label: 'Recurso' },
    { property: 'workCenter', label: 'Centro de Trabalho' }
  ];

  po:string;
  product:string;
  workCenter:string;
  resource: string;

  items: Array<any> = [
    {
      status: '01',
      po: '1234501001',
      company: '16',
      productCode: '3000088',
      productDescription: 'Caixa de Fueiro',
      orderQuantity: 10,
      orderQuantityDelivered: 8,
      warehouse: '04',
      resource: 'Guilhotina',
      workCenter: 'Fabricação Peças'
    },
    {
      status: '02',
      po: '1234501001',
      company: '16',
      productCode: '3000088',
      productDescription: 'Caixa de Fueiro',
      orderQuantity: 10,
      orderQuantityDelivered: 8,
      warehouse: '04',
      resource: 'Guilhotina',
      workCenter: 'Fabricação Peças'
    },
    {
      status: '03',
      po: '1234501001',
      company: '16',
      productCode: '3000088',
      productDescription: 'Caixa de Fueiro',
      orderQuantity: 10,
      orderQuantityDelivered: 8,
      warehouse: '04',
      resource: 'Guilhotina',
      workCenter: 'Fabricação Peças'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
