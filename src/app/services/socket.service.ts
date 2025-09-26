// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // URL serveur
  }

  
  // listenNewArticles(): Observable<any> {
  //   return new Observable(observer => {
  //     this.socket.on('newArticle', (data) => {
  //       observer.next(data);
  //     });
  //   });
  // }
   onNotification(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receiveNotification', (data) => {
        observer.next(data);
      });
    });
  }

  // Si tu veux émettre manuellement une notif depuis le front
  sendNotification(data: any) {
    this.socket.emit('sendNotification', data);
  }
}
