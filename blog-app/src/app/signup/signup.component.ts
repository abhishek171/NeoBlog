import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notificationservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User | undefined;
  userdata: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private notifyService: NotificationService
  ) {
    this.userdata = new FormGroup({
      Username: new FormControl("", [Validators.required]),
      Email: new FormControl("", [Validators.required, Validators.email]),
      Contact: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      Password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      confPassword: new FormControl("", [Validators.required]),
      ProfileImage: new FormControl(null, [Validators.required])
    }, { validators: this.valueMatch('Password', 'confPassword') });
  }

  valueMatch(controlName: string, matchingControlName: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      if (!control || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['mismatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        matchingControl.setErrors(null); 
        return null;
      }
    };
  }

  ngOnInit(): void {
    const usersInfo = localStorage.getItem('UserDetails');
    this.user = usersInfo ? JSON.parse(usersInfo) : null;

    if (this.router.url !== '/signup' && this.user) {
      this.userdata.patchValue({
        Username: this.user.Username,
        Email: this.user.Email,
        Contact: this.user.Contact
      });
    }
  }

  getInputValue(input: string) {
    return this.userdata.get(input);
  }

  collectData() {
    console.log(this.userdata);
  }

  funct(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.userdata.patchValue({ ProfileImage: file });
    }
  }

  onSubmit() {
    const formData = new FormData();
    Object.keys(this.userdata.value).forEach(key => {
      const value = this.userdata.get(key)?.value;
      if(key!=='confPassword'){
        formData.append(key, value);
      }
    });
    if (!this.user) {
      this.userService.signup(formData);
    } else {
      this.userService.update(formData, this.user?._id).subscribe({
        next: (response) => {
          this.notifyService.showSuccess('User Details Updated Successfully!');
          localStorage.setItem("UserDetails", JSON.stringify(response.data));
          this.userService.userSubject.next(response.data);
          this.userdata.reset();
        },
        error: (error) => {
          this.notifyService.showError("Error while updating data");
        }
      });
    }
  }
}
