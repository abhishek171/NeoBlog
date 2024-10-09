import { Component } from '@angular/core';
import { NotificationService } from '../services/notificationservice.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  isVisible: boolean = false;
  message: string = '';
  type: string = 'success';

  constructor(private notifyService: NotificationService) {}

  ngOnInit() {
    this.notifyService.message$.subscribe(msg => {
      if (msg) {
        this.message = msg.message;
        this.type = msg.type;
        this.showNotification();
      }
    });
  }
  showNotification() {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 2000);
  }
}
