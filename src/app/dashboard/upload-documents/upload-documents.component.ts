import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocumentTypeModel } from 'src/app/DocumentTypeModel';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({
    isHTML5: true
  });
tableShow:boolean;
uploadForm:FormGroup;
uploadDocumentForm:FormGroup;
 
  documentTypeModel:DocumentTypeModel;
  file:any;
   formData= new FormData();  
  documentTypes='---Select Document Type---';
  title="Documet Types";
  disableFileChose: boolean;
message:string;
  constructor(private _service:HttpServiceService,
    private formBuilder:FormBuilder) { 

  }

  ngOnInit() {
    this.tableShow=false;  
    this.uploadDocumentForm = this.formBuilder.group({
      documentControl: [this.documentTypes]
    });
  
    this.uploadForm = this.formBuilder.group({
      document: [null, null],
      type:  [null, Validators.compose([Validators.required])]
    });
    this.documentTypeModel=JSON.parse(localStorage.getItem('documentTypeModel'));
}

fileData(event,value:any)
{   this.tableShow=true;
    this.file = event.target.files;
    for (let j = 0; j < this.uploader.queue.length; j++) {
      
      let fileItem = this.uploader.queue[j]._file;
     
      this.formData.append('file', fileItem);
    
    }
    this.formData.append('zip','n');
    this.formData.append('docType',value);
    
    //this.files.push(event.target.files)
   //alert(this.files);
}
removeDocument(docValue:any,value:any){
    docValue.remove();
   if(this.uploader.queue.length==0){
     this.tableShow=false;
   }
    this.formData= new FormData();
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let fileItem = this.uploader.queue[j]._file;
      console.log(fileItem.name);
      this.formData.append('file', fileItem);

    }
    this.formData.append('zip','n');
    this.formData.append('docType',value);
  return false; 
}
uploadDocument(value){
  alert(value);

  if(value == ''){
    alert("Please select value from dropdown");
    return false;
  }

  if(null==this.formData.get('file')){
    alert("Please Upload some documents");
    this.tableShow=false;
    return false; 
  }
  this._service.uploadDocuments(this.formData)
    .subscribe((res)=>{
      
    console.log(res.json());
    this.message=res.json().message;
},_err=>{
this.message="UCM is down please try later";

});
  
 
 

}
  
}