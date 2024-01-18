import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  dataSource: any;
  str:string="   hello"

  
  inputtedValue: string = '';
  @Output() searchedVal = new EventEmitter<string>();




  //   getSearchValue() {
  //     this.searchedVal.emit(this.inputtedValue)

  // }
  getSearchValue() {
    this.inputtedValue = this.inputtedValue.trim();
    if (this.inputtedValue.length > 0 && this.inputtedValue[0] === ' ') {
      this.inputtedValue = this.inputtedValue.substring(1).trim();
    }
   this.searchedVal.emit(this.inputtedValue);

  }

  checkVal(value:any){
    if(value.target.value==""){
      this.searchedVal.emit("");
    }

  }
 
 
}

