import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  constructor(
    private chatService: ChatService) {
  }


  isLoadingChatRoom = true;
  isLoadingChatContent = true;
  listChatRoom: any;
  listUsers: UserMessage[];
  listUsersBackup: UserMessage[];
  rawMessages: any;
  public listMessage = new Array<Message>();
  currentUser: any;
  currentUserChat: any;

  userSearch: string;
  message: string;
  recipientID: string;

  senderID = sessionStorage.getItem("userID");
  senderAvatar = localStorage.getItem("userAvatar");

  private stompClient = null;
  private messageData = {
    senderID: sessionStorage.getItem("userID"),
    recipientID: '',
    message: ''
  }


  async ngOnInit() {
    this.messageData.senderID = sessionStorage.getItem("userID");
    await this.connect();
    await this.getChatRoom();
    await this.getListUsers();
    await this.getUnreadMessage();
    this.isLoadingChatRoom = false;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (sessionStorage.getItem("reciepientID")) {
        if (this.currentUser) {
          this.currentUser = this.listUsers.filter((user) => {
            if (user.userID === sessionStorage.getItem("reciepientID")) {
              return user
            }
            return 0;
          })
          this.selectUser(this.currentUser[0])
        }

      }
    }, 2500);


  }

  async sendMessage() {
    if (this.message) {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      await this.sendValue(this.message);
      this.currentUserChat.push({
        chatRoomID: this.currentUser.chatRoomID,
        senderID: this.senderID,
        recipientID: this.recipientID,
        content: this.message,
        timestamp: timestamp,
        status: "DELIVERED"
      })
      this.listMessage.push({
        chatRoomID: this.currentUser.chatRoomID,
        senderID: this.senderID,
        recipientID: this.recipientID,
        content: this.message,
        timestamp: timestamp,
        status: "DELIVERED"
      })
      this.message = null;
    }
    setTimeout(() => {
      this.autoScrollToNewMessage();
    }, 10);

  }

  async selectUser(user) {
    this.isLoadingChatContent = true;
    this.recipientID = user.userID;
    this.currentUser = user;
    const items = document.querySelectorAll(".reciepient");
    const element = document.getElementById(user.userID);
    items.forEach((item) => {
      item.classList.remove("active")
      item.removeAttribute("style");
    })
    element.classList.add("active")

    this.setReceipientID(this.recipientID);
    await this.getListMessages(user.chatRoomID);
    this.listUsers.map((selectedUser) => {
      if (user.userID === selectedUser.userID)
        selectedUser.isRead = true;
    })
    this.isLoadingChatContent = false;
    setTimeout(() => {
      this.autoScrollToNewMessage();
    }, 10);

  }

  public getListUsers() {
    this.listUsers = this.listChatRoom.map((chatRoom) => {
      if (chatRoom.user1.userID !== this.senderID) {
        return {
          chatRoomID: chatRoom.chatRoomID,
          userID: chatRoom.user1.userID,
          userName: chatRoom.user1.userFirstName + " " + chatRoom.user1.userLastName,
          userAvatar: chatRoom.user1.userAvatar,
          isRead: true
        };
      }
      else {
        return {
          chatRoomID: chatRoom.chatRoomID,
          userID: chatRoom.user2.userID,
          userName: chatRoom.user2.userFirstName + " " + chatRoom.user2.userLastName,
          userAvatar: chatRoom.user2.userAvatar,
          isRead: true
        };
      }
    })
    this.listUsersBackup = [...this.listUsers]

  }

  onFocusBoxChat() {
    this.chatService.putSeenMessage(this.senderID, this.recipientID).then(() => {

    })
      .catch(err => {
        console.log(err);
      })
  }

  public async getChatRoom() {
    await this.chatService.getChatRooom().then((chatRoom) => {
      console.log(chatRoom);
      this.listChatRoom = chatRoom
    })
      .catch((error) => {
        console.log(error)
      })
  }

  async getListMessages(chatRoomID: string) {
    await this.chatService.getMessageByChatRoom(chatRoomID, this.senderID, this.recipientID).then((messages) => {
      this.rawMessages = messages;
    }
    ).catch((error) => {
      console.log(error)
    })
    this.currentUserChat = await this.rawMessages.map((message) => {
      return {
        senderID: message.senderID,
        recipientID: message.recipientID,
        content: message.content,
        timestamp: message.timestamp,
        status: message.status
      }
    })
  }

  getUnreadMessage() {
    this.listUsers.map((user) => {
      this.chatService.getUnreadMessageByRecipientID(user.userID, this.senderID).then((messageCount) => {
        if (messageCount === 0)
          user.isRead = true
      })
        .catch((error) => {
          console.log(error)
        })
    })
  }



  onUserSearched() {
    this.listUsers = [...this.listUsersBackup]
    this.listUsers = this.listUsers.filter((room) => {
      if (room.userName.toLocaleLowerCase().includes(this.userSearch.toLocaleLowerCase()))
        return room;
      else
        return 0;

    })
  }

  autoScrollToNewMessage() {
    const chatContent = document.getElementById('boxchat')
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  public setReceipientID(recipientID: string) {
    this.messageData.recipientID = recipientID;
  }

  public connect() {
    let Sock = new SockJS('https://doan01-be-production.up.railway.app/ws');

    this.stompClient = over(Sock);
    this.stompClient.connect({}, this.onConnected, this.onError);
  }

  onConnected = () => {
    this.stompClient.subscribe('/private-message', this.onMessageSend);
    this.stompClient.subscribe('/user/' + sessionStorage.getItem("userID") + '/private', this.onPrivateMessage);
  }

  onMessageSend = (payload) => {
    var payloadData = JSON.parse(payload.body);
    this.listMessage.push(payloadData);
  }

  onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    this.listMessage.push(payloadData);
    if (this.currentUserChat)
      this.currentUserChat.push(payloadData);
    this.listUsers.map((user) => {
      if (user.userID === payloadData.senderID)
        user.isRead = false
    })
  }

  onError = (err) => {
    console.log(err);
  }

  sendValue(message) {
    if (this.stompClient) {
      var chatMessage = {
        senderID: this.messageData.senderID,
        recipientID: this.messageData.recipientID,
        content: message
      };
      this.stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      this.messageData.message = "";
    }
  }

}
export interface UserMessage {
  chatRoomID: string;
  userID: string;
  userName: string;
  userAvatar: string;
  isRead: boolean;
}

export interface Message {
  chatRoomID: string,
  senderID: string,
  recipientID: string,
  content: string,
  timestamp: any,
  status: string
}
