import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogpostService } from '../services/blogpost.service';
import { Blog } from '../classes/blog';
import { User } from '../classes/user';
import { NotificationService } from '../services/notificationservice.service';

@Component({
  selector: 'app-blogform',
  templateUrl: './blogform.component.html',
  styleUrls: ['./blogform.component.css']
})
export class BlogformComponent implements OnInit {

  @Input() blogPost: Blog | undefined;
  blogForm: FormGroup;
  userDetails: User | undefined;
  _id: string | undefined;

  constructor(private blogService: BlogpostService,public notifyService:NotificationService) {
    this.blogForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      body: new FormControl('', [Validators.required]),
      tags: new FormArray([])
    });
    const storedUserDetails = localStorage.getItem("UserDetails");
    this.userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : undefined;
    this._id = this.userDetails ? this.userDetails._id : undefined;
  }

  ngOnInit(): void {
    if (this.blogPost) {
      this.blogForm.patchValue({
        title: this.blogPost.title,
        body: this.blogPost.body
      });

      this.tags.clear();
      this.blogPost.tags.forEach(tag => {
        this.tags.push(new FormControl(tag));
      });
    }
  }

  get tags(): FormArray {
    return this.blogForm.get('tags') as FormArray;
  }

  addTag(inputElement: HTMLInputElement) {
    const tag = inputElement.value.trim();
    if (tag && /^[a-zA-Z]+$/.test(tag) && !this.tags.value.includes(tag)) {
      this.tags.push(new FormControl(tag));
      inputElement.value = '';
    } else {
      console.error('Invalid or duplicate tag');
    }
  }

  onSubmit() {
    if(this.blogForm.valid){
      if (!this.blogPost) {
        this.blogService.addNewBlog(this.blogForm.value, this._id).subscribe({
          next: (response) => {
            this.notifyService.showSuccess('Blog Created Successfully');
            this.blogForm.reset();
            this.blogService.blogPosts.next(response.data);
          },
          error: (error) => {
            this.notifyService.showError("Error While Inserting Data");
          }
        });
      } else {

        this.blogService.updateBlog(this.blogForm.value, this.blogPost._id).subscribe({
          next: (response) => {
            console.log("hello")
            this.notifyService.showSuccess("Blog Updated Successfully!");
            this.blogForm.reset();
            this.blogService.blogPosts.next(response.data);
          },
          error: (error) => {
            this.notifyService.showError("Error While Updating Data");
          }
        });
      }
    }else{
      this.notifyService.showError("Please fill the form details!");
    }
  }

  openNewWindow(event: MouseEvent) {
    event.preventDefault();
    const title = this.blogForm.get('title')?.value;
    const body = this.blogForm.get('body')?.value;
    const tags = this.tags.controls.map(tag => tag.value);
    const queryParams = `?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&tags=${encodeURIComponent(JSON.stringify(tags))}`;
    window.open(`/preview${queryParams}`, '_blank');
  }
}
