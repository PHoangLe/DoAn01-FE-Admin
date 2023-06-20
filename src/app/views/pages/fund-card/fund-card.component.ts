import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadService } from '../../../services/file-upload.service'
import { DonationService } from 'src/app/services/donation.service';
import { MessageService } from 'primeng/api';
import { Fund } from 'src/app/model/Fund'

@Component({
  selector: 'app-fund-card',
  templateUrl: './fund-card.component.html',
  styleUrls: ['./fund-card.component.scss']
})
export class FundCardComponent implements OnInit {
  protected fund: Fund;
  avatarFile: any;
  isWrongInput: boolean = true;
  selectedFundType: any;
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
  constructor(private builder: FormBuilder,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private fileUpload: FileUploadService,
    private donationService: DonationService,
    private messageService: MessageService
  ) {
    this.fund = this.config.data
    this.selectedFundType = this.listFundTypes.find(fundType => fundType.id === this.fund.fundType)
    if (!this.fund) {
      this.fund = new Fund();
      this.selectedFundType = this.listFundTypes[0]
    }
  }
  ngOnInit(): void {


  }


  addNewFund() {
    console.log(this.fund)
    this.fund.fundType = this.selectedFundType.id

    this.donationService.addNewFund(this.fund).then((response) => {
      console.log(response)
      this.messageService.add({ key: 'fund', severity: 'success', summary: "Thêm mới thành công!" });
      window.setInterval(() =>
        this.ref.close(), 1000);
    })
      .catch((error) => {
        console.log(error.error.message)
        this.messageService.add({ key: 'fund', severity: 'error', summary: error.error.message });
      })
  }

  updateFund() {
    this.fund.fundType = this.selectedFundType.id
    this.donationService.updateFund(this.fund).then((response) => {
      console.log(response)
      this.messageService.add({ key: 'fund', severity: 'success', summary: "Cập nhật thành công!" });
      window.setInterval(() =>
        this.ref.close(), 1000);
    })
      .catch((error) => {
        console.log(error.error.message)
        this.messageService.add({ key: 'fund', severity: 'error', summary: error.error.message });
      })
  }

  async selectedAvatar(event) {
    this.avatarFile = event.target.files;
    const imgInput = <HTMLImageElement>document.getElementById("imgInput")
    await this.fileUpload.pushFileToStorage(this.avatarFile[0])
    this.fund.fundCover = this.fileUpload.getAvatarUrl()
    imgInput.src = this.fund.fundCover
  }
}
