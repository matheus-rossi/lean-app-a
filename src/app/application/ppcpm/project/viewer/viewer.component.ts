import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})

export class ViewerComponent implements OnInit {

  apiUrl: string = 'https://192.168.5.221:8080/';
  code: string;
  pdfCode: string;

  constructor() { }

  ngOnInit(): void {
  }

  public searchDocument(): void {
    this.pdfCode = `${this.apiUrl}` + `${this.code}` + '.pdf'
    console.log(this.pdfCode);
  }

}
