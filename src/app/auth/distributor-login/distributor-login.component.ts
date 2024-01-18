import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS, LOCALSTORAGE_VALUES } from 'src/app/utils/app-constants';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-distributor-login',
  templateUrl: './distributor-login.component.html',
  styleUrls: ['./distributor-login.component.scss']
})
export class DistributorLoginComponent  {

  public showPassword: boolean = false;
  public showPasswordOnPress!: boolean;
  public submitted: boolean = false;
  loginData:any;
  isLoginInProgress:boolean = false;
  visible:boolean = true;
  changetype = true;


  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) { }

  loginForm = new FormGroup({
    username:new FormControl ("",[ Validators.required]),
    password:new FormControl ("",[ Validators.required])
  });
  
  get logins() {
     return this.loginForm.controls; 
    }


  login() {    
    this.submitted=true;

    if(this.loginForm.valid){
      this.isLoginInProgress = true;
      this.storageService.set(LOCALSTORAGE_KEYS.ACCESS_TOKEN, JSON.stringify(this.loginForm.value));
      this.storageService.set(LOCALSTORAGE_KEYS.USER_TYPE, LOCALSTORAGE_VALUES.DISTRIBUTOR);
      console.log(this.storageService.get(LOCALSTORAGE_KEYS.USER_TYPE));
      
      this.router.navigate(['/features/dashboard']);
    }
  }

  viewPass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
   }
}

