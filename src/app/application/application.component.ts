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
    {
      label: 'Página Inicial',
      shortLabel: 'Início',
      icon: 'po-icon-home',
      link: '/app/home'
    },
    {
      label: 'Eng de Processos',
      icon: 'po-icon-settings',
      shortLabel: 'Eng. Proc.',
      subItems: [
        {
          label: 'Balanceamento de Operadores',
          shortLabel: 'GBO',
          link: '/app/process/gbo'
        },
        {
          label: 'Troca Rápida Ferramenta',
          shortLabel: 'TRF',
          link: '/app/process/smed'
        },
        {
          label: 'Gestão do Posto de Trabalho',
          shortLabel: 'GPT'
        },
        {
          label: 'OEE / TEEP - Eficiência',
          shortLabel: 'OEE',
          link: '/app/process/oee'
        }
      ]
    },
    {
      label: 'PPCPM',
      icon: 'po-icon-manufacture',
      shortLabel: 'PPCPM',
      subItems: [
        {
          label: 'Ops',
          link: '/app/ppcpm/po'
        },
        {
          label: 'Projetos',
          link: '/app/ppcpm/project'
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
          link: '/app/quality/pareto'
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
    },
    {
      label: 'Cadeia de Ajuda',
      shortLabel: 'Ajuda',
      icon: 'po-icon-help',
      link: '/app/helpcenter/home'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
