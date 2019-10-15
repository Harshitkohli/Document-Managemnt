import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import {IMyDpOptions} from 'mydatepicker';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DocumentTypeModel } from '../DocumentTypeModel';
import { HttpServiceService } from '../http-service.service';

import { DocumentMangmentModel } from '../DocumentManagmentModel';
import  {SearchedDataModel} from '../SearchedDataModel';
import   { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-download-document',
  templateUrl: './download-document.component.html',
  styleUrls: ['./download-document.component.css']

})
export class DownloadDocumentComponent implements OnDestroy,OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  currentDate = new Date();
  public myDatePickerOptions: IMyDpOptions = {
  
    dateFormat: 'yyyy-mm-dd',  
    disableSince:{year:this.currentDate.getFullYear(),month:this.currentDate.getMonth() +1,
      day:this.currentDate.getDate()+1
    }
      
};    

  contentId ="Content Id";
  downloadDocumentForm:FormGroup;
  dtOptions: DataTables.Settings = {};
  tableShow:boolean;
  //dtTrigger: Subject = new Subject();
  clients: any[];
  displayedColumns = ["Content-ID","Document_Name"];
  docDesc="docDesc";
  documentTypeModel: DocumentTypeModel;
  documentManagmentModel:DocumentMangmentModel;
  searchDataModel:SearchedDataModel;
  documentTypes='---Select Document Type---';
  dtTrigger: Subject<any> = new Subject();
  
  constructor(private formBuilder:FormBuilder,private _service:HttpServiceService,
    private spinner: NgxSpinnerService) { }
 
  ngOnInit() :void{
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      
    };
   
    this.downloadDocumentForm = this.formBuilder.group({
      documentControl: [this.documentTypes]
      
    });
    this.tableShow=false;
    this.documentManagmentModel = new DocumentMangmentModel();
    this.documentTypeModel=JSON.parse(localStorage.getItem('documentTypeModel'));
  //  this.dtTrigger.next();
  }
  ngOnDestroy(): void {
  
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
   
  }
    
  searchDocument(value){   
    this.spinner.show();
    this.documentManagmentModel.typeOfDoc=value.value;
    if(this.documentManagmentModel.inputEndDate!=undefined){
      this.documentManagmentModel.endDate=this.documentManagmentModel.inputEndDate.formatted;    
    }else{
      this.documentManagmentModel.endDate=null;
    }
    if(this.documentManagmentModel.inputStartDate!=undefined)
     {
    this.documentManagmentModel.startingDate=this.documentManagmentModel.inputStartDate.formatted;
    }else{
      this.documentManagmentModel.endDate=null;
    }
   
    if(this.tableShow)
    this.rerender(); 
    
    this._service.searchDocument(this.documentManagmentModel).subscribe((res)=>{
        
     
    let data =res.json();
    this.tableShow=true;
    this.searchDataModel=data;
    this.dtTrigger.next();
    this.spinner.hide();  
  });
 
  
}
getFile(contentId,docName){
  this.documentManagmentModel.downloadContentID=contentId;
  this.documentManagmentModel.fileName=docName;
return this._service.getFile(this.documentManagmentModel).subscribe((res)=>{
        //window.location.href=res_body;
        console.log(res.blob());
        const blob = new Blob([res.text()],{type:'image/jpeg'});
        let fileURL = (window.URL).createObjectURL(blob);
        const url= window.URL.createObjectURL(blob);
       
       console.log(url);
        window.open(fileURL);
  });
 

}
rerender() {

  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
   // this.dtTrigger.next();
  });
}
}
