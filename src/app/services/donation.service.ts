import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  async getAllFundRequest() {
    let headers = this.getHttpHeader()
    return await this.http.get(this.baseUrl + 'funding-requests', { headers: headers }).toPromise();
  }

  async confirmDonation(donationID: string) {
    let headers = this.getHttpHeader()
    return await this.http.put(this.baseUrl + `donations/confirm/${donationID}`, { headers: headers }).toPromise();
  }

  async rejectDonation(donationID: string) {
    let headers = this.getHttpHeader()
    return await this.http.put(this.baseUrl + `donations/reject/${donationID}`, { headers: headers }).toPromise();
  }


  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem("jwtToken"))}`,
    });
  }

}
