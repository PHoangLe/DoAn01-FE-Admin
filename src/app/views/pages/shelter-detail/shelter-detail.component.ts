import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ShelterService } from 'src/app/services/shelter.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-shelter-detail',
  templateUrl: './shelter-detail.component.html',
  styleUrls: ['./shelter-detail.component.scss'],
  providers: [ChatComponent]

})
export class ShelterDetailComponent {

  requestInfo: any;
  constructor(
    private messageService: MessageService,
    private shelterService: ShelterService,
    private chat: ChatComponent,
    private router: Router) {

  }
  ngOnInit(): void {
    this.getPageData();

  }

  async getPageData() {
    this.requestInfo = await this.shelterService.getStorageShelter();
    console.log(this.requestInfo)
  }

  acceptRequest() {
    this.shelterService.approveShelter(this.requestInfo.shelterID).then(() => {
      this.messageService.add({ key: "message", severity: 'success', detail: 'Chấp nhận yêu cầu' })
      setTimeout(() => {
        this.router.navigate(['/pages/shelter-request']);
      }, 1500);
    })
  }

  rejectRequest() {
    this.shelterService.diapproveShelter(this.requestInfo.shelterID).then(() => {
      this.messageService.add({ key: "message", severity: 'error', detail: 'Từ chối yêu cầu' })
      setTimeout(() => {
        this.router.navigate(['/pages/shelter-request']);
      }, 1500);
    })
  }

  contactRequestor() {
    sessionStorage.setItem("reciepientID", this.requestInfo.userID)
    this.chat.connect();
    setTimeout(() => {
      this.chat.setReceipientID(this.requestInfo.userID);
      this.chat.sendValue("Bắt đầu trò chuyện")
      this.router.navigate(['pages/chat']);
    }, 2500);
  }

  urlToFileType(url: string): string {
    return url.slice(url.lastIndexOf('.') + 1, url.lastIndexOf('?'))
  }
}
