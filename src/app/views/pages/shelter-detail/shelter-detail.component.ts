import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ShelterService } from 'src/app/services/shelter.service';

@Component({
  selector: 'app-shelter-detail',
  templateUrl: './shelter-detail.component.html',
  styleUrls: ['./shelter-detail.component.scss']
})
export class ShelterDetailComponent {

  requestInfo: any;
  constructor(
    private messageService: MessageService,
    private shelterService: ShelterService,
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
        this.router.navigate(['/pasges/shelter-request']);
      }, 1500);
    })
  }

  rejectRequest() {
    this.shelterService.diapproveShelter(this.requestInfo.shelterID).then(() => {
      this.messageService.add({ key: "message", severity: 'error', detail: 'Từ chối yêu cầu' })
    })
  }

  contactRequestor() {

  }

  urlToFileType(url: string): string {
    console.log(url.slice(url.lastIndexOf('.') + 1, url.lastIndexOf('?')));

    return url.slice(url.lastIndexOf('.') + 1, url.lastIndexOf('?'))
  }
}
