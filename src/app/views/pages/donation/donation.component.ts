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
  listFundTypes = [
    {
      id: 'FOOD', value: 'Thực phẩm'
    },
    {
      id: 'MEDICAL', value: 'Y tế'
    },
    {
      id: 'ENTERTAINMENT', value: 'Giải trí'
    },
    {
      id: 'FACILITY', value: 'Cơ sở vật chất'
    },
    {
      id: 'MULTI_PURPOSE', value: 'Nhiều mục đích'
    }
  ]
  ref: DynamicDialogRef;

  constructor(
    private donationService: DonationService,
    public dialogService: DialogService,
    private router: Router,
  ) { }
  ngOnDestroy(): void {
    this.ref.close();
  }
  ngOnInit(): void {
    this.getFunds();
  }
  public async getFunds() {
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

  getFundType(fundType: string) {
    switch (fundType) {
      case 'FOOD': return 'Thực phẩm'
      case 'MEDICAL': return 'Y tế'
      case 'ENTERTAINMENT': return 'Giải trí'
      case 'FACILITY': return 'Cơ sở vật chất'
      default: return 'Nhiều mục đích'
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
    let passingFund = new Fund();
    passingFund = passingFund.copyFund(data);
    this.ref = this.dialogService.open(FundCardComponent, {
      data: passingFund,
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })
  }
}
