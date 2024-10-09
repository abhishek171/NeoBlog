import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from './notificationservice.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userSubject = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.userSubject.asObservable();

  private mongoParentRoute:string='http://localhost:8004/blogapp/user';
  constructor(private http:HttpClient,private router:Router,private notifyService : NotificationService) { }

  signup(userdata: FormData){
    this.http.post<{ success: boolean; data: User }>(`${this.mongoParentRoute}/signup`, userdata).subscribe({
      next: (response) => {
        this.notifyService.showSuccess('SignUp Successfully!');
        this.router.navigate(['signin']);
      },
      error: (ERR) => {
        this.notifyService.showError("Error Inserting Data: " + ERR.message);
      }
    });
  }

  login(userData: Object):Observable<{success: boolean; data: User}>{
    return this.http
      .post<{ success: boolean; data: User }>(`${this.mongoParentRoute}/login`,userData, { withCredentials: true });
  }

  update(userData: FormData, _id: string | undefined) {
    return this.http
      .put<{ success: boolean; data: User }>(`${this.mongoParentRoute}/updateUserDetail/${_id}`,userData, { withCredentials: true });
  }

  logout():Observable<{success: boolean}>{
    return this.http.get<{ success: boolean}>(`${this.mongoParentRoute}/logout`,{ withCredentials: true });
  }
}
