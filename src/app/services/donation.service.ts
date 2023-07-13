import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fund } from '../model/Fund';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/";

  constructor(private http: HttpClient) { }


  async getAllDonations() {
    let headers = this.getHttpHeader()
    return await this.http.get(this.baseUrl + 'donations', { headers: headers }).toPromise();
  }

  async getAllFunds() {
    let headers = this.getHttpHeader()
    return await this.http.get(this.baseUrl + 'funds', { headers: headers }).toPromise();
  }

  async getFundTransactions(fundID: string) {
    let headers = this.getHttpHeader()
    return await this.http.get(this.baseUrl + `funds/transactions/fund/${fundID}`, { headers: headers }).toPromise();
  }

  async getAllFundRequest() {
    let headers = this.getHttpHeader()
    return await this.http.get(this.baseUrl + 'funding-requests', { headers: headers }).toPromise();
  }

  async confirmDonation(donationID: string) {
    let headers = this.getHttpHeader()
    return await this.http.put(this.baseUrl + `donations/confirm/${donationID}`, null, { headers: headers }).toPromise();
  }

  async rejectDonation(donationID: string) {
    let headers = this.getHttpHeader()
    return await this.http.put(this.baseUrl + `donations/reject/${donationID}`, null, { headers: headers }).toPromise();
  }

  async confirmFundRequest(fundID: string) {
    let headers = this.getHttpHeader()
    return await this.http.put(this.baseUrl + `funding-requests/confirm/${fundID}`, null, { headers: headers }).toPromise();
  }

  async rejectFundRequest(fundID: string) {
    let headers = this.getHttpHeader()
    return await this.http.put(this.baseUrl + `funding-requests/reject/${fundID}`, null, { headers: headers }).toPromise();
  }


  async addNewFund(fund) {
    let headers = this.getHttpHeader()
    console.log(fund);
    return await this.http.post(this.baseUrl + 'funds', {
      fundName: fund.fundName,
      fundCover: fund.fundCover,
      fundDescription: fund.fundDescription,
      valuePerDonationPackage: fund.valuePerDonationPackage,
      fundType: fund.fundType
    }, { headers: headers }).toPromise();
  }

  async deleteFund(fundID) {
    let headers = this.getHttpHeader()
    return await this.http.delete(this.baseUrl + `funds/${fundID}`, { headers: headers }).toPromise();
  }


  async updateFund(fund: Fund) {
    let headers = this.getHttpHeader()
    return await this.http.put(this.baseUrl + `funds/${fund.fundID}`, {
      fundName: fund.fundName,
      fundCover: fund.fundCover,
      fundDescription: fund.fundDescription,
      valuePerDonationPackage: fund.valuePerDonationPackage,
      fundType: fund.fundType,
      fundBalance: fund.fundBalance
    }, { headers: headers }).toPromise();
  }

  convertToFundType(input: any) {
    var fundList = new Array<Fund>
    input.forEach(item => {
      const fund = new Fund(
        item.fundID,
        item.fundName,
        item.fundCover,
        item.fundDescription,
        item.valuePerDonationPackage,
        item.fundType,
        item.fundBalance
      )
      fundList.push(fund)
    });
    return fundList
  }

  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem("jwtToken"))}`,
    });
  }

}
