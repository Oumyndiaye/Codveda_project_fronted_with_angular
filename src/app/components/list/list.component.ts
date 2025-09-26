import { Component } from '@angular/core';
import { Stuff, StuffService } from '../../services/stuff.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-list',
  imports: [CommonModule,RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  constructor(private stuffService : StuffService,private authService:AuthService,private socketService: SocketService ){}
    items: Stuff[] = [];
    newNotifications = 0
    notifications: any[] = [];


  ngOnInit(){
    this.getAllStuffs()
    this.socketService.onNotification().subscribe((notif) => {
    console.log('🔔 Nouvelle notification:', notif);
      this.notifications.push(notif); // stocker la notification
    this.newNotifications++;
    console.log(this.newNotifications);
    
  });
  
  //    this.socketService.listenNewArticles().subscribe(data => {
  //           alert(`Nouvel article ajouté : ${data.title}`);

  //     console.log(data,this.newNotifications);
      
  //   this.newNotifications++;
  // });

  }
  clearNotifications() {
  this.newNotifications = 0;
}
  ngAfterOnInit(){

  }

   get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
  }
  getAllStuffs() {
    this.stuffService.getAllStuffs().subscribe((result)=>{
      this.items = result
    })
  }
}
