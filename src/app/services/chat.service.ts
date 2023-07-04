import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/chat/";

  constructor(private http: HttpClient) {
  }


  async getChatRooom() {
    const userID = sessionStorage.getItem("userID")
    return await this.http.get(this.baseUrl + "getAllChatRoomByUserID/" + `${userID}`).toPromise();
  }

  async getMessageByChatRoom(chatRoom: string, senderID: string, recipientID: string) {
    return await this.http.get(this.baseUrl + "getAllMessageBySenderIDAndRecipientID/" + `${chatRoom}/` + `${senderID}/` + `${recipientID}`).toPromise();
  }

  async getUnreadMessageByRecipientID(recipientID: string, senderID: string) {
    let headers = this.getHttpHeader();
    return await this.http.get(this.baseUrl + "messages/" + `${senderID}/` + `${recipientID}/count`, { headers }).toPromise();
  }

  putSeenMessage(senderID: string, recipientID: string) {
    let headers = this.getHttpHeader();
    return this.http.put(this.baseUrl + "seenMessage/" + `${senderID}/` + `${recipientID}`, { headers }).toPromise();
  }

  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem("jwtToken")}`,
    });
  }

}
