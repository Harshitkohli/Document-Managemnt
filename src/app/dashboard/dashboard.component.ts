import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { DocumentTypeModel } from '../DocumentTypeModel';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  documentTypeModel: DocumentTypeModel;

  constructor(private _service:HttpServiceService) { }

    ngOnInit() {
      this._service.getUserType().subscribe((res)=>{
   
        this.documentTypeModel =res.json();
      
        localStorage.setItem("documentTypeModel", JSON.stringify(this.documentTypeModel));
      });
  //console.log('this'+localStorage.getItem('documentTypeModel'));        
  }

}
