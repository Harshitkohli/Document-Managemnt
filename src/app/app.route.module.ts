import { RouterModule, Routes } from '@angular/router';

import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadDocumentsComponent } from './dashboard/upload-documents/upload-documents.component';
import { DownloadDocumentComponent } from './download-document/download-document.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'userRegistration', component: UserRegistrationComponent },
    {path:'dashboard',component: DashboardComponent},
    {path:'uploadDocuments',component:UploadDocumentsComponent},
    {path:'downloadDocuments',component:DownloadDocumentComponent},
   
    { path: 'login',
    redirectTo: '/login',
    pathMatch: 'full'
  },
    { path: 'dashboard',
    redirectTo: '/dashboard',
    pathMatch: 'full'
     },
   { path: 'dashboard/uploadDocuments',
  redirectTo: '/uploadDocuments',
  pathMatch: 'full'
  }
  ];
  

export const routing = RouterModule.forRoot(routes, {useHash: true});