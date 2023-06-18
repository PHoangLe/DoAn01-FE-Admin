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
      console.log(request)
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
    })
      .catch((err) => {
        this.messageService.add({ key: 'reactFundRequest', severity: 'error', summary: 'Có lỗi xảy ra!' })
        console.log(err.error.message)
      })

  }

  rejectRequest(fundRequestID) {
    this.donationService.rejectFundRequest(fundRequestID).then(response => {
      this.messageService.add({ key: 'reactFundRequest', severity: 'error', summary: 'Xác nhận thành công!' })
    })
      .catch((err) => {
        this.messageService.add({ key: 'reactFundRequest', severity: 'error', summary: 'Có lỗi xảy ra!' })
        console.log(err.error.message)
      })
  }

  onRowSelect(data) {
    console.log(data)
    // this.petAdopt.setStorageAdoption(data)
    // this.router.navigate([`pages/adoption-detail/${data.applicationID}`])
  }

}
