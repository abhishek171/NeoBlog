import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/user';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  title: string | undefined;
  body: string | undefined;
  tags: string[] = [];
  userDetails: User | undefined;
  constructor(private route: ActivatedRoute) {
    const userInfo = localStorage.getItem('UserDetails');
    this.userDetails = userInfo ? JSON.parse(userInfo) : undefined;
    console.log(this.userDetails)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.body = params['body'];
      this.tags = params['tags'] ? JSON.parse(params['tags']) : [];
    });
    
  }
}
