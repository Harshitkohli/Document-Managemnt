import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { MatTableModule } from '@angular/material';
import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import { LoginComponent } from './login/login.component';

import {FileUploadModule} from 'ng2-file-upload';
import { routing } from './app.route.module';

import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LinksComponent } from './links/links.component';

import { UploadDocumentsComponent } from './dashboard/upload-documents/upload-documents.component';
import { DownloadDocumentComponent } from './download-document/download-document.component';
import { MyDatePickerModule } from 'mydatepicker';

import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegistrationComponent,
    DashboardComponent,
    HeaderComponent,
    LinksComponent,
    UploadDocumentsComponent,
    DownloadDocumentComponent
  ],
  imports: [  
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    FileUploadModule,
    MyDatePickerModule,
    DataTablesModule,
    MatTableModule,
    NgxSpinnerModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
   
}
