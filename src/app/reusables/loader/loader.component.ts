import { Component, OnInit } from '@angular/core';
import { LoadingserviceService } from 'src/app/services/features/loading/loadingservice.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  
  constructor(private loadingService: LoadingserviceService) { }
  isLoading: Subject<boolean> = this.loadingService.isLoading;

 

}
