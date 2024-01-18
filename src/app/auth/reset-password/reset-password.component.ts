import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  currentPass = '';
  submitted = false;
  resetPassForm: FormGroup;
  constructor(private formBuilder:FormBuilder,
    private authService: AuthService) { 
   this.resetPassForm =this.formBuilder.group({
      currentpass: new FormControl(window.location.href.split('?')[1].split('&')[0].split('=')[1],[Validators.required]),
      newPass: new FormControl("",[Validators.required]),
      confirmPass : new FormControl("",[Validators.required])
    },
    { validators: this.MustMatch('newPass','confirmPass') }
    )
  }

  ngOnInit(): void {
    console.log(window.location.href.split('?')[1].split('&')[0].split('=')[1]);
    this.resetPassForm.value.currentpass = window.location.href.split('?')[1].split('&')[0].split('=')[1];
    console.log(this.resetPassForm.value);
    this.currentPass = window.location.href.split('?')[1].split('&')[0].split('=')[1];
  }

  

  get formControls() {
    return this.resetPassForm.controls;
  }

  MustMatch(controlName:string,matchingControlName:string){
return (formGroup:FormGroup)=>{
  const control=formGroup.controls[controlName];
  const matchingcontrol=formGroup.controls[matchingControlName];
  if(matchingcontrol.errors && !matchingcontrol.errors['MustMatch']){
return
  }
  if(control.value !== matchingcontrol.value){
matchingcontrol.setErrors({MustMatch:true})
  }
  else{
    matchingcontrol.setErrors(null);
  }
  
}
  }
  submit() {    
    this.submitted = true;
    console.log({"confirmPassword": this.resetPassForm.value.confirmPass, "currentPassword": this.currentPass, "newPassword": this.resetPassForm.value.newPass});
    console.log(this.resetPassForm.valid);
    
    if(this.resetPassForm.valid) {
      console.log({"confirmPassword": this.resetPassForm.value.confirmPass, "currentPassword": this.currentPass, "newPassword": this.resetPassForm.value.newPass});
      
      this.authService.resetPassword({"confirmPassword": this.resetPassForm.value.confirmPass, "currentPassword": this.currentPass, "newPassword": this.resetPassForm.value.newPass}).subscribe((res:any)=> {
        console.log(res);
       
      })
      
    }

  }
  visible:boolean = true;
  changetype = true;
  viewPass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
   }
 
}
