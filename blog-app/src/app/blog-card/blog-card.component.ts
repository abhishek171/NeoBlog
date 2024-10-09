import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../classes/blog';
import { BlogpostService } from '../services/blogpost.service';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notificationservice.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent implements OnInit{
  @Input() blogPost:Blog | undefined;
  user:User | undefined;
  isModalOpen:boolean=false;
  
  constructor(public blogPostService : BlogpostService,private userService:UserService,public router:Router,private notifyService:NotificationService){
    this.userService.user$.subscribe(()=> {
      const userInfo = localStorage.getItem('UserDetails');
      this.user = userInfo ? JSON.parse(userInfo) : undefined;
      if (this.user && this.blogPost && this.blogPost.user) {
        this.blogPost.user.Username = this.user.Username;
        this.blogPost.user.ProfileImage = this.user.ProfileImage;
      }
    });
  }
  ngOnInit(): void {
    this.blogPostService.blogPost$.subscribe(blogPost => {
     this.isModalOpen = false;
    });
  }
  openModal(){
    this.isModalOpen = true;
  }
  closeModal(){
    this.isModalOpen = false;
  }

  deleteBlog(id:string|undefined){
    this.blogPostService.deleteBlog(id).subscribe({
      next: (response) => {
        this.notifyService.showSuccess('Blog deleted Successfully!');
        this.blogPostService.blogPosts.next(response.data);
      },
      error: (error) => {
        this.notifyService.showError(error);
      }
    });
  }
}
