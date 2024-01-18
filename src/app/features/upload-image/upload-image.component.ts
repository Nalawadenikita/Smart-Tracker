import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';
import { DistributorService } from 'src/app/services/features/distributor/distributor.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  constructor(private distributorService: DistributorService,
    private storageService: StorageService, private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  id: any;


  ngOnInit(): void {
    this.id = JSON.parse(atob(this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1]))['DISTRIBUTOR_ID'];
    console.log(this.id);


  }
  selectedFile: File;
  
  uploadedImageId: string | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmitForm() {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append("file", this.selectedFile, this.selectedFile.name);
      this.distributorService.postImage(this.id, formData).pipe(catchError(err => of(err))).subscribe(res => {
        if (res.fileId) {
          this.dialogRef.closeAll();
          Swal.fire(
            {
              title:'Logo Added successfully',
              icon: 'success'
            }
          )
        }
        else {
          if (res.status == 500) {
            Swal.fire({
              title: ' Something went wrong',
              text: 'There was an error on the server. Please try again later.',
              icon: 'error',
            });
          } else {

            Swal.fire({
              title: res.error?.data.message,
              icon: 'error',
            });
          }
        }

      });


    }
  }
  closeDialog() {
    this.dialogRef.closeAll();
  }
  

}
