import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';
import { loginData } from '../LoginModel';


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
  
  constructor(private _service:HttpServiceService ,private router:Router) { 
    
   }
  ngOnInit() {   
    this.status=this.status;
    this.errorMsgshow=false;
     console.log(this.errorMsgshow);
     
  }

  doLogin(){
    this.loginData= new loginData();
    this.loginData.userId = this.userID;
    this.loginData.password=this.userPassword;
    
    this._service.getLogin(this.loginData).subscribe(res=>{
    this.status =res.status;
    
    let data=res.json();
    console.log(data);
    if(this.status==200){
      this.loginData.userType=data.userType;
   
      //localStorage.setItem('uploaderRole', this.loginData.userType);
      this.errorMsgshow=false;
      
      return this.router.navigate(['/dashboard']);
     }else{
      console.log(data.message);
       this.errorMessage=data.message;
       this.errorMsgshow=true;
       console.log(this.errorMessage);
     }
  //this.errorMessage=res.json();
  },_err =>{
    this.errorMessage='Login Service is down please try later';
    this.errorMsgshow=true;
    return false;
  });
  
}
}


