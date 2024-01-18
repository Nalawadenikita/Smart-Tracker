import { Component ,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showPassword: boolean = false;
  public showPasswordOnPress!: boolean;

  constructor(private router : Router){

  }
  
  ngOnInit(): void {
    
  }
 
   
  loginpage=new FormGroup({
    username:new FormControl("",[Validators.required, Validators.minLength(3)]),
    password:new FormControl("",[Validators.required, Validators.minLength(3)])
  });
//with these approach you can navigate to any page from root of application
  moveTo(){
    this.router.navigate(['/features/dashboard'])
  }

}
