import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tableColumns } from 'src/app/models/tableColumn';
import { SelectionModel } from '@angular/cdk/collections';

import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { map, pipe, startWith, switchMap } from 'rxjs';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {

  pageIndex: any;
  totalData: any;
  @Input() tableData: any = [];
  @Input() displayedColumns: any = [];
  @Input() Value: any;
  @Input() totalRecords: number;
  @Input() totalPages: number;
  @Input() currentPage: number = 0;
  @Input() enableSelectAll: boolean = true; 
  @Input() checklist: any =null; 
  @Input() isDisUser:boolean;
  dataList: any[] = [];

  @Output() pageIndexCalculator = new EventEmitter<{ pageIndex: any }>()
  columns: string[] = [];
  isLoading: any = false;

  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort!: MatSort;

  selection = new SelectionModel<any>(true, []);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }


  handlePageEvent(event: any) {
    this.pageIndexCalculator.emit({ pageIndex: event.pageIndex + 1 });
  }

  constructor(private _liveAnnouncer: LiveAnnouncer) { }
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit(): void {
    this.dataList.sort((a, b) => a.days - b.days);
    this.displayedColumns.forEach((element: any) => {
      this.columns.push(element.field);
      console.log(element.field)
    });
    
  }
  

  ngOnChanges(changes:SimpleChanges):void {
    // this.dataSource = new MatTableDataSource<any>(this.tableData);
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.filter = this.Value;
    if (changes['enableSelectAll']) {
      this.enableSelectAll = changes['enableSelectAll'].currentValue;
    }
    if(this.tableData) {
      console.log(this.tableData);
      this.dataSource = new MatTableDataSource<any>(this.tableData);
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
      this.dataSource.filter = this.Value;  
    }

    if (this.tableData == null) {
      this.isLoading = true;
    }
    else if (this.tableData == " ") {
      this.isLoading = false;
    }
    else {
      this.isLoading = false;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return this.checklist[this.currentPage];



   
   
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
    
      
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  viewTransaction(action: any, row: any) {
    action.callback(row);
  }

  select(action: any, event: any, row: any) {
    action.callback(event, row);
  }

  selectAll(action: any, event: any) {
    action.callback(event);
  }

  editRow(action: any, data: any) {
    console.log(data)
    
    action.callback(data);
    
  }

  deleteRow(action: any, data: any) {
    action.callback(data);
  }

  updateStatus(action: any, event: any, row: any) {
    action.callback(event, row);
  }

  viewCylinderHistory(action: any, row: any) {
    action.callback(row)
  }

}




