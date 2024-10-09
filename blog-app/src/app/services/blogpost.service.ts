import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../classes/blog';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogpostService {
  public blogPosts = new BehaviorSubject<Blog | string | undefined>(undefined);
  blogPost$ = this.blogPosts.asObservable();

  public searchTerm = new BehaviorSubject<string | undefined>(undefined);
  search$ = this.searchTerm.asObservable();

  public filteredData: Blog[] = [];

  private mongoParentRoute: string = 'http://localhost:8004/blogapp/blogpost';
  constructor(private http: HttpClient) {}

  listUserBlogs(skip: number): Observable<{ success: boolean; data: Blog[] }> {
    return this.http.get<{ success: boolean; data: Blog[] }>(
      `${this.mongoParentRoute}/listUserBlogs/${skip}`,
      { withCredentials: true }
    );
  }

  blogDetailsById(
id: string | undefined, skip: number  ): Observable<{ success: boolean; data: Blog[] }> {
    return this.http.get<{ success: boolean; data: Blog[] }>(
      `${this.mongoParentRoute}/blogDetails/${id}/${skip}`,
      { withCredentials: true }
    );
  }

  addNewBlog(
    blogData: any,
    id: string | undefined
  ): Observable<{ success: boolean; data: Blog }> {
    blogData['user'] = id;
    return this.http.post<{ success: boolean; data: Blog }>(
      `${this.mongoParentRoute}/createUserBlog`,
      blogData,
      { withCredentials: true }
    );
  }

  updateBlog(
    blogData: any,
    _id: string | undefined
  ): Observable<{ success: boolean; data: Blog }> {
    return this.http.put<{ success: boolean; data: Blog }>(
      `${this.mongoParentRoute}/editUserBlog/${_id}`,
      blogData,
      { withCredentials: true }
    );
  }

  deleteBlog(id: string | undefined) {
    return this.http.delete<{ success: boolean; data: string }>(
      `${this.mongoParentRoute}/deleteUserBlog/${id}`,
      { withCredentials: true }
    );
  }
}
