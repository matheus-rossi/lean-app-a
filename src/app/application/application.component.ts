import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})

export class ApplicationComponent implements OnInit {

  menuItemSelected: string;

  menus: Array<PoMenuItem> = [
    { label: 'Eng de Processos', 
      icon: 'po-icon-settings', 
      shortLabel: 'Eng. Proc.' ,
      subItems: [
        { 
          label: 'Balanceamento Operacional',
          icon: 'po-icon-settings', 
          shortLabel: 'GBO',
          link: '/app/gbo'
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
          label: 'Pareto'
        },
        { 
          label: 'Correlação'
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

  constructor() { }

  ngOnInit(): void {
  }

}
