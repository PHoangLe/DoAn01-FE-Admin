import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent {
  listRequest: any;
  isLoading = true;
  constructor(
    private donationService: DonationService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.getFundsRequest();
  }
  async getFundsRequest() {
    await this.donationService.getAllFunds().then(request => {
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

  onRowSelect(data) {
    console.log(data)
    // this.petAdopt.setStorageAdoption(data)
    // this.router.navigate([`pages/adoption-detail/${data.applicationID}`])
  }
}
