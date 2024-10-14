import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { Blog } from '../classes/blog';
import { User } from '../classes/user';
import { NotificationService } from '../services/notificationservice.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css'],
})
export class UserdashboardComponent implements OnInit {
  buttonClicked: string = 'next';
  blogPosts: Blog[] = [];
  private postsToShow: number = 0;
  userDetails: User | undefined;
  _id: string | undefined;
  isModalOpen: boolean = false;
  isLoading: boolean = false;
  selectorder: string = 'desc';
  dataArrayNotEmpty = true;

  constructor(
    public blogPostService: BlogpostService,
    private notifyService: NotificationService
  ) {
    const storedUserDetails = localStorage.getItem('UserDetails');
    this.userDetails = storedUserDetails
      ? JSON.parse(storedUserDetails)
      : undefined;
    this._id = this.userDetails ? this.userDetails._id : undefined;
  }

  ngOnInit(): void {
    this.fetchBlogPosts();
    this.blogPostService.blogPost$.subscribe((value) => {
      if (value !== undefined) {
        this.isModalOpen = false;
        this.blogPosts = [];
        this.fetchBlogPosts();
      }
    });
    this.blogPostService.search$.subscribe((searchVal) => {
      if (searchVal !== undefined && searchVal !== 'cancel') {
        this.filterPosts(searchVal);
      } else if (
        searchVal === 'cancel' &&
        this.blogPostService.searchEmpty === '/dashboard'
      ) {
        this.isLoading = true;
        setTimeout(() => {
          this.blogPosts = [];
          this.blogPosts = this.blogPostService.filteredData;
          this.isLoading = false;
        }, 3000);
      }
    });
  }
  filterPosts(searchVal: string) {
    this.isLoading = true;
    this.blogPosts = [];
    setTimeout(() => {
      this.blogPosts = this.blogPostService.filteredData.filter((item) =>
        item.title.includes(searchVal)
      );
      this.isLoading = false;
    }, 3000);
  }

  fetchBlogPosts(): void {
    this.isLoading = true;
    this.blogPostService.blogDetailsById(this._id, this.postsToShow).subscribe({
      next: (response: { success: boolean; data: Blog[] }) => {
        setTimeout(() => {
          this.isLoading = false;
          if (response.success) {
            if (response.data.length === 0) {
              this.dataArrayNotEmpty = false;
            } else {
              const blogData = response.data as Blog[];
              this.blogPosts = [...this.blogPosts, ...blogData];
              this.blogPostService.filteredData = this.blogPosts;
            }
          } else {
            this.notifyService.showError('No Data Found');
          }
        }, 3000);
      },
      error: (ERR: any) => {
        this.isLoading = false;
        this.notifyService.showError('Error Fetching Data');
      },
    });
  }

  loadMore(): void {
    this.postsToShow = this.postsToShow + 6;
    this.fetchBlogPosts();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
