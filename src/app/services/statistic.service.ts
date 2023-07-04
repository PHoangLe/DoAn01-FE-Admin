import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/statistic";


  constructor(private http: HttpClient) { }

  async getAllStat() {
    let header = this.getHttpHeader();
    return await this.http.get(this.baseUrl + '/admin-dashboard', { headers: header }).toPromise();
  }

  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem("jwtToken"))}`,

    });
  }
}
