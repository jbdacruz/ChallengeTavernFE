import {Component, inject} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {UserService} from '../services/user.service';
import {UserCreatePayload} from '../models/user-payload';
import {Router} from '@angular/router';
import {ElementRef} from '@angular/core';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {
  @ViewChild('welcomeDialog') dialogRef!: ElementRef<HTMLDialogElement>;
  newUserName = 'New user';

  userService = inject(UserService);
  router = inject(Router);

  signUp(formData: NgForm) {
    let user :UserCreatePayload = {password : formData.form.value.password,
      birthday: new Date(formData.form.value.birthday).toISOString().slice(0, 10),
      email : formData.form.value.email,
      weight : formData.form.value.weight,
      height : formData.form.value.heightFt*12+formData.form.value.heightIn,
      firstName: formData.form.value.firstName,
      lastName: formData.form.value.lastName,
      branch: formData.form.value.branch.toUpperCase().replace(/s/g,"")};


    this.userService.createUser(user).subscribe(
      auser => {
        this.newUserName = auser.firstName+" "+auser.lastName;
        this.dialogRef.nativeElement.showModal();
        setTimeout(() => {
          this.dialogRef.nativeElement.close();
          this.router.navigate(['/login']);
        }, 2000);


      },
      error => {
        console.log(error);


      }
    );

  }

}
