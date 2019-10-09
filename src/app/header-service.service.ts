import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';




@Injectable({
  providedIn: 'root'
})
export class HeaderServiceService {

  constructor() { }

  getHeader(){
    let option: any;

    let headers = new Headers();
    headers.append('Content-Type','application/json');
    option = new RequestOptions({headers:headers});
    return option;
  }

  getMutilpartHeaders(){
    let option: any;
    let headers = new Headers();
    headers.append('Access-Control','Allow-Origin');
    option = new RequestOptions({headers:headers});
    return option;
  }
}
