import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/";
  constructor(private http: HttpClient) { }

  async login(email: string, password: string): Promise<any> {
    console.log(email, password);

    return await (this.http.post(this.baseUrl + 'auth/authenticate', {
      userEmail: email,
      userPassword: password
    }, httpOptions
    )).toPromise();
  }

}
