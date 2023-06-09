import { Component, OnInit } from '@angular/core';
import { PetAdoptionService } from '../../../services/pet-adoption.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './adoption-request.component.html',
  styleUrls: ['./adoption-request.component.scss']
})
export class AdoptionRequestComponent implements OnInit {

  listRequest: any[];
  isLoading = true;
  constructor(
    private petAdopt: PetAdoptionService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.getAdoptionRequest();
  }
  async getAdoptionRequest() {
    await this.petAdopt.getAllAdoption().then(adoption => {
      this.listRequest = adoption;
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
    this.petAdopt.setStorageAdoption(data)
    this.router.navigate([`pages/adoption-detail/${data.applicationID}`])
  }

}
