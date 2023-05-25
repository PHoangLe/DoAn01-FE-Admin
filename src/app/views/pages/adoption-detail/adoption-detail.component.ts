import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';

@Component({
  selector: 'app-adoption-detail',
  templateUrl: './adoption-detail.component.html',
  styleUrls: ['./adoption-detail.component.less']
})
export class AdoptionDetailComponent implements OnInit {
  requestInfo: any;
  constructor(
    private messageService: MessageService,
    private petAdoptionService: PetAdoptionService) {

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
      console.log(response)
      this.messageService.add({ key: "message", severity: 'success', detail: 'Chấp nhận yêu cầu' })
    })
  }

  rejectRequest() {
    this.petAdoptionService.declineOnlineAdoption(this.requestInfo.applicationID).then((response) => {
      console.log(response)
      this.messageService.add({ key: "message", severity: 'warning', detail: 'Từ chối yêu cầu' })
    })
  }

  contactRequestor() {

  }

}
