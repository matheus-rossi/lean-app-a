import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-home',
  templateUrl: './application-home.component.html',
  styleUrls: ['./application-home.component.css']
})
export class ApplicationHomeComponent implements OnInit {

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
          situation: '0%',
          status: 'info',
          value: 0
        },
        {
          text: 'GPT',
          situation: '0%',
          status: 'info',
          value: 0
        },
        {
          text: 'OEE / TEEP',
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
