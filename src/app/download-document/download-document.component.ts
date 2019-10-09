import { Component, OnInit } from '@angular/core';

import {IMyDpOptions} from 'mydatepicker';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DocumentTypeModel } from '../DocumentTypeModel';
import { HttpServiceService } from '../http-service.service';

import { DocumentMangmentModel } from '../DocumentManagmentModel';
import  {SearchedDataModel} from '../SearchedDataModel';
@Component({
  selector: 'app-download-document',
  templateUrl: './download-document.component.html',
  styleUrls: ['./download-document.component.css']
})
export class DownloadDocumentComponent implements OnInit {
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    
};  
downloadDocumentForm:FormGroup;
  clients: any[];
  displayedColumns = ["Content-ID","Document_Name"];
  docDesc="docDesc";
  documentTypeModel: DocumentTypeModel;
  documentManagmentModel:DocumentMangmentModel;
  searchDataModel:SearchedDataModel;
  documentTypes='---Select Document Type---';
  constructor(private formBuilder:FormBuilder,private _service:HttpServiceService) { }
 
  ngOnInit() {
    this.downloadDocumentForm = this.formBuilder.group({
      documentControl: [this.documentTypes]
      
    });
    this.documentManagmentModel = new DocumentMangmentModel();
    this.documentTypeModel=JSON.parse(localStorage.getItem('documentTypeModel'));
    
  }
  goToFile(){
    alert("hi");
  }
  searchDocument(value){
    this.documentManagmentModel.typeOfDoc=value.value;
    this._service.searchDocument(this.documentManagmentModel).subscribe((res)=>{
    let data =res.json();
    this.searchDataModel=data;
  console.log(this.searchDataModel);
    //this.searchDataModel=data.contentId;
    
    //console.log("search module "+this.searchDataModel.contentId);
  });
}

}
