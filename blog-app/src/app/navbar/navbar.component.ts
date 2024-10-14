import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notificationservice.service';
import { NgForm } from '@angular/forms';
import { BlogpostService } from '../services/blogpost.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  mobileMenuOpen:boolean= false;
  user:User|undefined;
  modal:boolean = false;
  profileAction:string | undefined;
  searchTerm: string = "cancel";
  
  constructor(public router:Router,private userService:UserService,private notifyService : NotificationService,private blogService:BlogpostService){
    this.userService.user$.subscribe(()=> {
      const userInfo = localStorage.getItem('UserDetails');
      this.user = userInfo ? JSON.parse(userInfo) : undefined;
      this.profileAction = '';
    this.modal = false;
    });
  }

  checkActive(routeVal: string): boolean {
    return this.router.url === routeVal ? true : false;
  }

  toggleMobileMenu():void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  openModal(action:string){
    this.profileAction = action;
    this.modal = true;
  }

  closeModal(){
    this.profileAction = '';
    this.modal = false;
  }
  
  logout(){
    this.userService.logout().subscribe({
      next: (response) => {
          if (response.success) {
              this.notifyService.showSuccess('Signed out successfully');
              localStorage.removeItem('UserDetails');
              this.user = undefined;
              this.router.navigate(['blogpost']);
          } else {
              window.alert("Logout failed.");
          }
      },
      error: (error) => {
          this.notifyService.showError("Error during logout: " + (error.message || 'Unknown error'));
      }
    });
  }

  searchData(searchForm: NgForm) {
    if (searchForm.valid) {
     this.searchTerm = searchForm.value.searchBlog;
     this.blogService.searchTerm.next(this.searchTerm);
     this.blogService.searchBarEmpty = true;
    }
  }

  get isSearchTermValid() {
    return this.searchTerm.trim() !== "cancel";
  }

  cancelSearch(searchForm: NgForm){
    searchForm.reset();
    this.searchTerm = "cancel";
    this.blogService.searchEmpty = this.router.url;
    this.blogService.searchBarEmpty=false;
    this.blogService.searchTerm.next(this.searchTerm);
  }

}
