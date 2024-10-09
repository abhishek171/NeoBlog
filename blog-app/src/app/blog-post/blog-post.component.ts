import { Component, HostListener, OnInit } from '@angular/core';
import { Blog } from '../classes/blog';
import { BlogpostService } from '../services/blogpost.service';
import { NotificationService } from '../services/notificationservice.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent implements OnInit {
  blogPosts: Blog[] = [];
  private initialLength: number = 0;
  isLoading: boolean = false;
  selectorder: string = 'desc';
  dataArrayNotEmpty:boolean = true;
  constructor(
    public blogPostService: BlogpostService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
    this.blogPostService.search$.subscribe((searchVal) => {
      if (searchVal!== undefined && searchVal !== 'cancel') {
        this.filterPosts(searchVal);
      } else if(searchVal === "cancel") {
        this.isLoading = true;
        setTimeout(() => {
          this.blogPosts = [];
          this.blogPosts = this.blogPostService.filteredData;
          this.isLoading = false;
        }, 3000);
      }
    });
  }

  private filterPosts(searchVal: string): void {
    this.isLoading = true;
    this.blogPosts = [];
    setTimeout(() => {
      this.blogPosts = this.blogPostService.filteredData.filter(
        (item) =>
          item.title.includes(searchVal) ||
          item.user.Username.includes(searchVal)
      );
      this.isLoading = false;
    }, 3000);
  }

  loadBlogs(): void {
    this.isLoading = true;
    this.blogPostService.listUserBlogs(this.initialLength).subscribe({
      next: (response: { success: boolean; data: Blog[] }) => {
        this.blogPostService.filteredData = response.data;
        setTimeout(() => {
          this.isLoading = false;
          if (response.success) {
            if(response.data.length === 0){
              this.dataArrayNotEmpty = false
            }
            else{
              const blogData = response.data as Blog[];
              this.blogPosts = [...this.blogPosts, ...blogData];
            }
          } else {
            this.notifyService.showError('No Data Found');
          }
        }, 3000);
      },
      error: (ERR: any) => {
        this.isLoading = false;
        this.notifyService.showError('No Data Found');
      },
    });
  }

  loadMore(): void {
    this.initialLength = this.initialLength + 5;
    this.loadBlogs();
  }
}
