import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeaderServiceService } from './header-service.service';
import { DocumentMangmentModel } from './DocumentManagmentModel';



@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  intialUrl: string = 'http://localhost:8080/DocumentManagment/';
  constructor(private _http: Http, private _header: HeaderServiceService) { }


  getLogin(data: any) {
    return this._http.post(this.intialUrl + "checkPassword", data,
      this._header.getHeader())
      .pipe(map(res => res));
  }
  getUserType() {

    return this._http.post(this.intialUrl + "getDocumentType",
      this._header.getHeader())
      .pipe(map(res => res));
  }

  uploadDocuments(formData: FormData) {

    return this._http.post(this.intialUrl + "fileUpload",formData,
    this._header.getMutilpartHeaders())
      .pipe(map(res => res));
  }
  searchDocument(documentManagment :DocumentMangmentModel){
   
    return this._http.post(this.intialUrl+"getDocuments",documentManagment,
    this._header.getHeader()).pipe(map(res=>res));
  }
  getFile(documentManagment :DocumentMangmentModel){
    return this._http.post(this.intialUrl+"getFile",documentManagment,
    this._header.getHeader()).pipe(map(res=>res));
  }

}
