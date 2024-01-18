import { Component, OnInit } from '@angular/core';
import { data } from './dummy';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  mydata = data;
  filtered_data:any = [];
  counter:any=0;

  data_from_table = [
    {
      customer_name: '',
      transactions: {
        location_name: [
          {
            date: '',
            gas_type: '',
            transaction_id: '',
            cylinder_size: '',
            cylinder_code: '',
            cylinder_count: '',
          },
        ],
      },
    },
  ];

  ngOnInit(): void {
    console.log(this.mydata);

    this.mydata.forEach((record) => {
      let stagging_data: any = {
        customer_name: record.customerId[0].name,
        transactions: [],
      };


      record.customerId[0].locationMasterResponse.forEach((transaction) => {
        stagging_data.transactions[transaction.locationName] = [];
        transaction.cylinderMasterResponseList.forEach((data) => {
          
          console.log(this.counter);
          stagging_data.transactions.push({
            date: data.lastTransactionDate,
            gas_type: data.gasType.gasName,
            transaction_id: data.id,
            cylinder_size: data.cylinderSize.cylinderType,
            cylinder_code: data.cylinderCode,
            cylinder_count: data.byCount,
            loc:transaction.locationName
          });
        });
      });

      this.filtered_data.push(stagging_data);
    });
    console.log(this.filtered_data);
    
  }
}
