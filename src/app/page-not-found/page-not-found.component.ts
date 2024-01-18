import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  template: `
  NOT FOUND!
`,
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {



  ngOnInit(): void {
  }
  

  constructor() {}
 
  reload(){
    window.location.reload();
  }
}
