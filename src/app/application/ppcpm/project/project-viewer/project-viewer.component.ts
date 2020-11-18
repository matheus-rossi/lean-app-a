import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './project-viewer.component.html',
  styleUrls: ['./project-viewer.component.css']
})

export class ProjectViewerComponent implements OnInit {

  apiUrl = 'http://192.168.5.221:8080/';
  code: string;
  pdfCode: string;

  constructor() { }

  ngOnInit(): void {
  }

  public searchDocument(): void {
    this.pdfCode = `${this.apiUrl}` + `${this.code}` + '.pdf';
  }

}
