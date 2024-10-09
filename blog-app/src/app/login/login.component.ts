import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notificationservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userData:Object = {};
  userNotSelected: boolean = false;
  constructor(private userService : UserService,private router:Router,private notifyService:NotificationService){

  }
  collectData(loginForm: NgForm): void {

    if (loginForm.valid) {
      const { email, password } = loginForm.value;
  
      this.userData = {
          Email: email,
          Password: password
      };
  
      this.userService.login(this.userData).subscribe({
          next: (response) => {
              this.notifyService.showSuccess("SignedIn Successfully!")
              localStorage.setItem("UserDetails", JSON.stringify(response.data));
              this.userService.userSubject.next(response.data);
              loginForm.reset();
              this.router.navigate(['dashboard']);
          },
          error: (error) => {
            this.notifyService.showError("Incorrect Credentials");
          }
      });
  }
   else {
    this.notifyService.showError("Please fill out the form correctly.");
    }
  }
}
