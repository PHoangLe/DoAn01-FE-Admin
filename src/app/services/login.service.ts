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
    return await (this.http.post(this.baseUrl + 'auth/authenticate', {
      userEmail: email,
      userPassword: password
    }, httpOptions
    )).toPromise();
  }

  setRoles(userRoles: []) {
    sessionStorage.setItem("userRoles", JSON.stringify(userRoles))
  }
  getRoles() {
    return sessionStorage.getItem("userRoles")
  }

  setToken(jwtToken: string) {
    console.log("set token gg ")
    sessionStorage.setItem("jwtToken", jwtToken)
  }

  getToken(): string {
    return sessionStorage.getItem("jwtToken")
  }
  roleMatch(allowedRoles: any): boolean {
    const userRoles = this.getRoles();
    console.log(userRoles)
    if (userRoles != null && userRoles)
      if (userRoles.includes(allowedRoles[0]))
        return true
    return false
  }

}
