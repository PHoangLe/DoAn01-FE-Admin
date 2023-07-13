import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { ShelterRequestComponent } from './shelter-request/shelter-request.component';
import { AdoptionDetailComponent } from './adoption-detail/adoption-detail.component';
import { AdoptionRequestComponent } from './request-list/adoption-request.component';


import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { GalleriaModule } from 'primeng/galleria';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ShelterDetailComponent } from './shelter-detail/shelter-detail.component';
import { TooltipModule } from 'primeng/tooltip';
import { DonationComponent } from './donation/donation.component';
import { FundRequestComponent } from './fund-request/fund-request.component';
import { DonationRequestComponent } from './donation-request/donation-request.component';
import { FundCardComponent } from './fund-card/fund-card.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

import { environment } from 'src/environments/environment'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { ChatComponent } from './chat/chat.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    ShelterRequestComponent,
    AdoptionDetailComponent,
    AdoptionRequestComponent,
    ShelterDetailComponent,
    DonationComponent,
    FundRequestComponent,
    DonationRequestComponent,
    FundCardComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    DividerModule,
    DividerModule,
    PaginatorModule,
    DataViewModule,
    RadioButtonModule,
    BreadcrumbModule,
    DynamicDialogModule,
    TableModule,
    InputTextareaModule,
    GalleriaModule,
    AvatarModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    TagModule,
    ConfirmDialogModule,
    TooltipModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    DropdownModule,
    InputNumberModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ]

})
export class PagesModule { }


