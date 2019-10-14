import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';
import { loginData } from '../LoginModel';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userID :string;
  userPassword:string;
  status:number;
  errorMsgshow:boolean;
  errorMessage:string;
  loginData:loginData ;
  
  constructor(private _service:HttpServiceService ,private router:Router,
    private spinner: NgxSpinnerService) { 
    
   }
  ngOnInit() {   
    this.status=this.status;
    this.errorMsgshow=false;
   // this.spinner.show(); 
  }

  doLogin(){
    this.loginData= new loginData();
    this.loginData.userId = this.userID;
    this.loginData.password=this.userPassword;
    this.spinner.show();
    this._service.getLogin(this.loginData).subscribe(res=>{
    this.status =res.status;
    
    let data=res.json();
    
    if(this.status==200){
      localStorage.setItem("activate","true");
      this.loginData.userType=data.userType;   
      this.errorMsgshow=false;
     
      return this.router.navigate(['dashboard']);
     }else{
      localStorage.setItem("activate","false");
       this.errorMessage=data.message;
       this.errorMsgshow=true;
      return false;
     }
  //this.errorMessage=res.json();
  },_err =>{
    this.spinner.hide();
    localStorage.setItem("activate","false");
    this.errorMessage='Login Service is down please try later';
    this.errorMsgshow=true;
    return false;
  });
  
}
}


