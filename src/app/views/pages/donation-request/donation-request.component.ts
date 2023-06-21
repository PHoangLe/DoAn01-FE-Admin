import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-donation-request',
  templateUrl: './donation-request.component.html',
  styleUrls: ['./donation-request.component.scss']
})
export class DonationRequestComponent {
  listRequest: any;
  isLoading = true;
  constructor(
    private donationService: DonationService,
    private messageService: MessageService,

    private router: Router,
  ) { }
  ngOnInit(): void {
    this.getFundsRequest();
  }
  async getFundsRequest() {
    await this.donationService.getAllDonations().then(request => {
      this.listRequest = request;
      console.log(this.listRequest);
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

  acceptDonation(donationID) {
    this.donationService.confirmDonation(donationID).then(response => {
      this.messageService.add({ key: 'reactDonation', severity: 'success', summary: 'Xác nhận thành công!' })
      let donation = this.listRequest.find(donation => donation.donationID === donationID)
      donation.donationStatus = 'COMPLETED'
    })
      .catch((err) => {
        this.messageService.add({ key: 'reactDonation', severity: 'error', summary: 'Có lỗi xảy ra!' })
        console.log(err.error.message)
      })

  }

  rejectDonation(donationID) {
    this.donationService.rejectDonation(donationID).then(response => {
      this.messageService.add({ key: 'reactDonation', severity: 'error', summary: 'Xác nhận thành công!' })
    })
      .catch((err) => {
        this.messageService.add({ key: 'reactDonation', severity: 'error', summary: 'Có lỗi xảy ra!' })
        console.log(err.error.message)
      })
  }

  onRowSelect(data) {
    console.log(data)
    // this.petAdopt.setStorageAdoption(data)
    // this.router.navigate([`pages/adoption-detail/${data.applicationID}`])
  }
}
