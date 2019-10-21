import { Component, OnInit } from '@angular/core';
import {  Routes } from '@angular/router';
import { loginData } from '../LoginModel';



@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
  private _routes:Routes;
  private loginData:loginData;
data(){

  return false;
}
  constructor() { }

  ngOnInit() {
   this.loginData=this.loginData;
  }

}
