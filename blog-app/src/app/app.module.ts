import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { BlogformComponent } from './blogform/blogform.component';
import { PreviewComponent } from './preview/preview.component';
import { provideHttpClient } from '@angular/common/http';
import { NotificationComponent } from './notification/notification.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { SortpipePipe } from './custompipes/sortpipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BlogCardComponent,
    LoginComponent,
    SignupComponent,
    UserdashboardComponent,
    BlogformComponent,
    PreviewComponent,
    NotificationComponent,
    PagenotfoundComponent,
    BlogPostComponent,
    SortpipePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,ReactiveFormsModule,
    EditorModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

