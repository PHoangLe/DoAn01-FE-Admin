import { Component } from '@angular/core';
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
    private shelterService: ShelterService) {

  }
  ngOnInit(): void {
    this.getPageData();
  }

  async getPageData() {
    this.requestInfo = await this.shelterService.getStorageShelter();
    console.log(this.requestInfo)
  }

  acceptRequest() {
    this.shelterService.approveShelter(this.requestInfo.applicationID).then((response) => {
      console.log(response)
      this.messageService.add({ key: "message", severity: 'success', detail: 'Chấp nhận yêu cầu' })
    })
  }

  contactRequestor() {

  }

}
