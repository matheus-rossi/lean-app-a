import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItemSelected: string;

  menus: Array<PoMenuItem> = [
    { label: 'Eng de Processos', 
      icon: 'po-icon-settings', 
      shortLabel: 'Eng. Proc.' ,
      subItems: [
        { 
          label: 'Balanceamento Operacional',
          icon: 'po-icon-settings', 
          shortLabel: 'GBO' 
        },
        { 
          label: 'Troca Rápida Ferramenta',
          icon: 'po-icon-settings', 
          shortLabel: 'TRF' 
        },
        { 
          label: 'Gestão do Posto de Trabalho',
          icon: 'po-icon-settings', 
          shortLabel: 'GPT' 
        },
        { 
          label: 'Eficiência',
          icon: 'po-icon-settings', 
          shortLabel: 'OEE' 
        }
      ]
    },
    { label: 'PPCPM', 
      icon: 'po-icon-manufacture', 
      shortLabel: 'PPCPM',
      subItems: [
        { 
          label: 'Produção'
        }
      ]
    },
    {
      label: 'Qualidade',
      icon: 'po-icon-chart-area',
      shortLabel: 'Qual.',
      subItems: [
        { 
          label: 'Pareto', 
          link: 'http://trabalho.gov.br/' 
        },
        { 
          label: 'Correlação', 
          link: 'http://www.sindpd.com.br/' 
        }
      ]
    },
    {
      label: 'Financeiro',
      icon: 'po-icon-money',
      shortLabel: 'Fin.',
      subItems: [
        {
          label: 'ROI'
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {
  }

}
