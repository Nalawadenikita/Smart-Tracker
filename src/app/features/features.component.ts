import {
  Component,
  HostListener,
  Renderer2,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { LOCALSTORAGE_KEYS, LOCALSTORAGE_VALUES } from '../utils/app-constants';
import { DistributorService } from 'src/app/services/features/distributor/distributor.service';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { MatDialog } from '@angular/material/dialog';
import { ReportService } from 'src/app/services/features/report/report.service';
import { DistributorUserService } from '../services/features/distributorUser/distributor-user.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  isMenuOpened = false;
  isSidebarOpened = true;
  mode: any = 'side';
  login: any;
  distributorName: any;
  v: any;
  s: any;
  img_constant = 'data:image/png;base64,';
  role:any;

  isDistributor = false;

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private storageService: StorageService,
    private router: Router,
    private distributor: DistributorService,
    private dialogRef: MatDialog,
    private reportservice: ReportService,
    private distributorUserService: DistributorUserService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.isMenuOpened === true) {
        if (
          e.target !== this.toggleButton.nativeElement &&
          e.target !== this.menu.nativeElement
        ) {
          this.isMenuOpened = false;
        }
      }
    });
  }

  ngOnInit(): void {
    if (window.innerWidth < 800) {
      this.mode = 'over';
      this.isSidebarOpened = false;
    }
    this.login = JSON.parse(
      this.storageService.get(LOCALSTORAGE_KEYS.TOKEN_OBJECT)
    );
    if (this.login['sub'] == 'admin') {
      this.distributorName = 'Admin';
    } else if (this.login['USER_TYPE'] === 'ROLE_DISTRIBUTOR_USER') {
      this.distributorUserService
        .getDistributorUserById(this.login['ID'])
        .subscribe((res: any) => {
          this.distributorName = res['name'];
          this.role='[Distributor User]';
        });
    } else {
      this.distributor
        .getDistributorById(this.login['DISTRIBUTOR_ID'])
        .subscribe((res) => {
          this.distributorName = res['name'];
          this.role='[Distributor]';
          this.isDistributor = true;
        });
    }
    this.loadLogo();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any } }) {
    if (event.target.innerWidth < 800) {
      this.isSidebarOpened = false;
      this.mode = 'over';
    } else {
      this.isSidebarOpened = true;
      this.mode = 'side';
    }
  }

  display_menu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  logout() {
    if (
      this.storageService.get(LOCALSTORAGE_KEYS.USER_TYPE) ===
      LOCALSTORAGE_VALUES.DISTRIBUTOR
    ) {
      this.router.navigate(['auth/distributorlogin']);
    } else {
      this.router.navigate(['auth/login']);
    }
    this.storageService.clearAll();
  }

  openDialog() {
    const uploadImag = this.dialogRef.open(UploadImageComponent);
    uploadImag.afterClosed().subscribe((res: any) => {
      console.log(res);
      this.loadLogo();
    });
  }

  loadLogo() {
    this.reportservice
      .getImageBydistributor(this.login['DISTRIBUTOR_ID'])
      .subscribe((res) => {
        if (res) {
          this.v = res.image;
          if (this.v) {
            this.s = this.img_constant + this.v;
          }
        }
      });
  }
}
