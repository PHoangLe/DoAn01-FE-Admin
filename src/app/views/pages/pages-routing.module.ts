import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';
import { ShelterRequestComponent } from './shelter-request/shelter-request.component';
import { AdoptionRequestComponent } from './request-list/adoption-request.component'
import { AdoptionDetailComponent } from './adoption-detail/adoption-detail.component'
import { ShelterDetailComponent } from './shelter-detail/shelter-detail.component';
import { DonationComponent } from './donation/donation.component';
import { DonationRequestComponent } from './donation-request/donation-request.component';
import { FundRequestComponent } from './fund-request/fund-request.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [

  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'adoption-request',
    component: AdoptionRequestComponent,
    data: {
      title: 'Danh sách yêu cầu'
    }
  },
  {
    path: 'adoption-detail/:id',
    component: AdoptionDetailComponent,
    data: {
      title: 'Thông tin chi tiết'
    }
  },
  {
    path: 'shelter-request',
    component: ShelterRequestComponent,
    data: {
      title: 'Đăng ký tài khoản trại cứu trợ'
    }
  },
  {
    path: 'shelter-detail/:id',
    component: ShelterDetailComponent,
    data: {
      title: 'Thông tin chi tiết'
    }
  },
  {
    path: 'donation',
    component: DonationComponent,
    data: {
      title: 'Quản lý quỹ'
    }
  },
  {
    path: 'donation-request',
    component: DonationRequestComponent,
    data: {
      title: 'Danh sách ủng hộ'
    }
  },
  {
    path: 'fund-request',
    component: FundRequestComponent,
    data: {
      title: 'Yêu cầu hỗ trợ'
    }
  },
  {
    path: 'chat',
    component: ChatComponent,
    data: {
      title: 'Tin nhắn'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
