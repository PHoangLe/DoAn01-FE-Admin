import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FileUploadService } from '../../../services/file-upload.service'

@Component({
  selector: 'app-fund-card',
  templateUrl: './fund-card.component.html',
  styleUrls: ['./fund-card.component.scss']
})
export class FundCardComponent implements OnInit {
  protected fund: any;
  avatarFile: any;
  avatarUrl: any;

  constructor(private builder: FormBuilder,
    private config: DynamicDialogConfig,
    private fileUpload: FileUploadService
  ) {
    if (this.config.data)
      this.fund = this.config.data
    console.log(this.fund)
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  addNewFund() {

  }

  updateFund() {

  }

  async selectedAvatar(event) {
    // this.avatarFile = event.target.files;
    // const imgInput = <HTMLImageElement>document.getElementById("imgInput")
    // await this.fileUpload.pushFileToStorage(this.avatarFile[0])
    // this.avatarUrl = this.fileUpload.getAvatarUrl()
    // imgInput.src = this.avatarUrl
  }
}
