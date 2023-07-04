import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-fund-request',
  templateUrl: './fund-request.component.html',
  styleUrls: ['./fund-request.component.scss']
})
export class FundRequestComponent {
  listRequest: any;
  isLoading = true;
  constructor(
    private donationService: DonationService,
    private router: Router,
    public messageService: MessageService,

  ) { }
  ngOnInit(): void {
    this.getFundsRequest();
  }
  async getFundsRequest() {
    await this.donationService.getAllFundRequest().then(request => {
      this.listRequest = request;
    })
      .catch(error => {
        console.log(error.error.message)
      })
    this.isLoading = false
  }

  getSeverity(status: string) {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'info';
      default:
        return 'danger';
    }
  }

  acceptRequest(fundRequestID) {
    this.donationService.confirmFundRequest(fundRequestID).then(response => {
      this.messageService.add({ key: 'reactFundRequest', severity: 'success', summary: 'Xác nhận thành công!' })
      let fundRequest = this.listRequest.find(fundReq => fundReq.requestID === fundRequestID)
      fundRequest.requestStatus = 'COMPLETED'
    })
      .catch((err) => {
        this.messageService.add({ key: 'reactFundRequest', severity: 'error', summary: err.error.message ? err.error.message : 'Có lỗi xảy ra!' })
        console.log(err.error.message)
      })

  }

  rejectRequest(fundRequestID) {
    this.donationService.rejectFundRequest(fundRequestID).then(response => {
      this.messageService.add({ key: 'reactFundRequest', severity: 'success', summary: 'Đã từ chối!' })
      let fundRequest = this.listRequest.find(fundReq => fundReq.requestID === fundRequestID)
      fundRequest.requestStatus = 'REJECTED'
    })
      .catch((err) => {
        this.messageService.add({ key: 'reactFundRequest', severity: 'error', summary: err.error.message })
        console.log(err.error.message)
      })
  }



}
