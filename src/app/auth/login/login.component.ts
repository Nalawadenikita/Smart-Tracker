import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS, LOCALSTORAGE_VALUES } from 'src/app/utils/app-constants';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LOGOCODE } from 'src/app/utils/app-constants';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showPassword: boolean = false;
  public showPasswordOnPress!: boolean;
  public submitted: boolean = false;
  loginData: any;
  isLoginInProgress: boolean = false;
  accessTokenValue: any;
  decodedToken: any;
  smartTrackerLogo: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) { }

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  get logins() {
    return this.loginForm.controls;
  }


  login() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.isLoginInProgress = true;

      this.authService.getLogin(this.loginForm.value).subscribe((res) => {
        if (res) {
          this.accessTokenValue = res;
          console.log(atob(this.accessTokenValue.accessToken.split('.')[1]));
          this.decodedToken = atob(this.accessTokenValue.accessToken.split('.')[1]);
          this.storageService.set(LOCALSTORAGE_KEYS.TOKEN_OBJECT, this.decodedToken);
          this.storageService.set(LOCALSTORAGE_KEYS.ACCESS_TOKEN, this.accessTokenValue.accessToken);
          this.storageService.set(LOCALSTORAGE_KEYS.USER_TYPE, LOCALSTORAGE_VALUES.ADMIN);
        
        }
        this.router.navigate(['/features/dashboard']);

      },
        (err) => {
          if (err.status == 401) {
            Swal.fire({
              title: "Invalid Username or Password",
              text: "Please enter valid details",
              icon: "error"
            }
            )
          }
        });

    }

  }
  ngOnInit(): void {
    this.smartTrackerLogo = LOGOCODE.SMARTTRACKER;
  }
  visible: boolean = true;
  changetype = true;
  viewPass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}

