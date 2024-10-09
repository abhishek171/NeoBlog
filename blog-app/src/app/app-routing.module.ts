import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { userAuth } from './auth-guard/userauth';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { PreviewComponent } from './preview/preview.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BlogPostComponent } from './blog-post/blog-post.component';

const routes: Routes = [

    {
      path:"",
      redirectTo: "blogpost",
      pathMatch:"full", 
    },
    {
      path:"blogpost",
      loadChildren:()=>import('../app/blog-post/blog-post.module')
    },
    {
      path:"signin",
      loadChildren:()=>import('../app/login/login.module')
    },
    {
      path:"signup",
      loadChildren:()=>import('../app/signup/signup.module')
    },
    {
      path:"dashboard",
      loadChildren:()=>import('../app/userdashboard/userdashboard.module'),
      canActivate:[userAuth],
    },
    {
      path:"preview",
      loadChildren:()=>import('../app/preview/preview.module'),
      canActivate:[userAuth],
    },
    {
      path: '**',
      component: PagenotfoundComponent,
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
