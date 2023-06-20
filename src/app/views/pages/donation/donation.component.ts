import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DonationService } from 'src/app/services/donation.service';
import { FundCardComponent } from '../fund-card/fund-card.component';
import { Fund } from 'src/app/model/Fund';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],
  providers: [DialogService, MessageService]

})
export class DonationComponent implements OnInit, OnDestroy {
  fundList: Fund[];
  isLoading = true;
  ref: DynamicDialogRef;

  constructor(
    private donationService: DonationService,
    public dialogService: DialogService,
    private router: Router,
  ) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getFundsRequest();
  }
  async getFundsRequest() {
    await this.donationService.getAllFunds().then(fundRes => {
      console.log(fundRes)
      this.fundList = this.donationService.convertToFundType(fundRes);
      console.log(this.fundList)
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

  addNewFund() {
    this.ref = this.dialogService.open(FundCardComponent, {
      data: "",
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })

  }
  onRowSelect(data) {
    console.log(data)
    this.ref = this.dialogService.open(FundCardComponent, {
      data: data,
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })
  }
}
