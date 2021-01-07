import { Component, OnInit } from '@angular/core';
import { PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-application-home',
  templateUrl: './application-home.component.html',
  styleUrls: ['./application-home.component.css']
})
export class ApplicationHomeComponent implements OnInit {

  public readonly actions: Array<PoPageAction> = [
    { label: 'Ajuda', url: 'https://www.linkedin.com/in/matheus-sandrini-rossi/', icon: 'po-icon-help' }
  ];

  constructor() { }

  projectStatus: Array<any> = [
    {
      domain: 'Engenharia de Processos',
      subDomain: [
        {
          text: 'GBO',
          situation: '100%',
          status: 'success',
          value: 100
        },
        {
          text: 'TRF',
          situation: '100%',
          status: 'success',
          value: 100
        },
        {
          text: 'GPT',
          situation: '0%',
          status: 'info',
          value: 0
        },
        {
          text: 'OEE / TEEP',
          situation: '100%',
          status: 'success',
          value: 100
        }
      ]
    },
    {
      domain: 'PPCPM',
      subDomain: [
        {
          text: 'Visualização Projetos',
          situation: '100%',
          status: 'success',
          value: 100
        },
        {
          text: 'Centro de OPs',
          situation: '20%',
          status: 'info',
          value: 20
        },
        {
          text: 'Carga Máquina',
          situation: '0%',
          status: 'info',
          value: 0
        }
      ]
    },
    {
      domain: 'Qualidade',
      subDomain: [
        {
          text: 'Pareto',
          situation: '0%',
          status: 'info',
          value: 0
        },
        {
          text: 'Correlação',
          situation: '0%',
          status: 'info',
          value: 0
        },
        {
          text: '5w2hg',
          situation: '0%',
          status: 'info',
          value: 0
        }
      ]
    },
    {
      domain: 'Financeiro',
      subDomain: [
        {
          text: 'ROI',
          situation: '0%',
          status: 'info',
          value: 0
        }
      ]
    },
    {
      domain: 'Ajuda',
      subDomain: [
        {
          text: 'Cadeia de Ajuda',
          situation: '0%',
          status: 'info',
          value: 0
        }
      ]
    }
  ];

  ngOnInit(): void {
  }

}
