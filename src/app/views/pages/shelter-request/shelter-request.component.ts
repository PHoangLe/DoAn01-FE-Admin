import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShelterService } from 'src/app/services/shelter.service';

@Component({
  selector: 'app-shelter-request',
  templateUrl: './shelter-request.component.html',
  styleUrls: ['./shelter-request.component.scss']
})
export class ShelterRequestComponent implements OnInit {
  listRequest: any
  isLoading = true;
  constructor(
    private shelterService: ShelterService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.getShleterRequest();
  }
  async getShleterRequest() {
    await this.shelterService.getShelterRequest().then(request => {
      console.log(request);
      this.listRequest = request
    })
      .catch(error => {
        console.log(error.error.message)
      })
    this.isLoading = false;
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
    this.shelterService.setStorageShelter(data)
    this.router.navigate([`pages/shelter-detail/${data.shelterID}`])
  }

}
