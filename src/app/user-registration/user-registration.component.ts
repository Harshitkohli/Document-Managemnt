import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})

export class UserRegistrationComponent implements OnInit {
  userForm:FormGroup;
 
  passwordError:boolean=false;
userType="---Select User Type---";
  title="User Registration"
  userList=[this.userType,'Bussiness User','Admin User',]
  userName;
  userPassword;
  confirmPassword; 
  //public userData = ["","val1", "val2"];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userControl: [this.userType]
    });
   if(this.userPassword!=this.confirmPassword){
    this.passwordError=true;
   }
  }
getUrl(){
  return "url('../assets/img/login.png')";

}

}
