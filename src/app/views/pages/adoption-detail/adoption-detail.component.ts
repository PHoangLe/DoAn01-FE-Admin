import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-adoption-detail',
  templateUrl: './adoption-detail.component.html',
  styleUrls: ['./adoption-detail.component.less'],
  providers: [ChatComponent]
})
export class AdoptionDetailComponent implements OnInit {
  requestInfo: any;
  constructor(
    private messageService: MessageService,
    private petAdoptionService: PetAdoptionService,
    private chat: ChatComponent,
    private router: Router) {

  }
  ngOnInit(): void {
    this.getPageData();
  }

  async getPageData() {
    this.requestInfo = await this.petAdoptionService.getStorageAdoption();
    console.log(this.requestInfo)
  }

  acceptRequest() {
    this.petAdoptionService.acceptOnlineAdoption(this.requestInfo.applicationID).then((response) => {
      this.messageService.add({ key: "message", severity: 'success', detail: 'Chấp nhận yêu cầu' })
      setTimeout(() => {
        this.router.navigate(['pages/adoption-request'])
      }, 2000);
    })
  }

  rejectRequest() {
    this.petAdoptionService.declineOnlineAdoption(this.requestInfo.applicationID).then((response) => {
      this.messageService.add({ key: "message", severity: 'warning', detail: 'Từ chối yêu cầu' })
      setTimeout(() => {
        this.router.navigate(['pages/adoption-request'])
      }, 2000);
    })
  }

  contactRequestor() {
    sessionStorage.setItem("reciepientID", this.requestInfo.user.userID)
    this.chat.connect();
    setTimeout(() => {
      this.chat.setReceipientID(this.requestInfo.user.userID);
      this.chat.sendValue("Bắt đầu trò chuyện")
      this.router.navigate(['pages/chat']);
    }, 2500);
  }

}
