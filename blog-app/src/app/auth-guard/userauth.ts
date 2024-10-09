import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notificationservice.service';

export function userAuth(): boolean {
    const router = inject(Router)
    const notifyService = inject(NotificationService);
    const userInfo = localStorage.getItem('UserDetails');
    
    let user;

    try {
        user = userInfo ? JSON.parse(userInfo) : null;
    } catch (e) {
        notifyService.showError("Parsing Error"+e);
        user = null;
    }

    if (!user) {
        notifyService.showError("Login First");
        router.navigate(['/signin'])
        return false;
    }

    return true;
}

// 
