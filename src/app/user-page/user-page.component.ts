import {Component, inject} from '@angular/core';
// import {UserService} from '../services/user.service';
import {ExerciseService} from '../services/exercise.service';
import {User} from '../models/user';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  exerciseService = inject(ExerciseService);
  user: User = new User(); // default

  ngOnInit(): void {
    const raw = sessionStorage.getItem('user');
    if (raw) {
      // If User is a class, re-hydrate so methods/prototypes are kept
      this.user = Object.assign(new User(), JSON.parse(raw));
      // If User is an interface instead, do: this.user = JSON.parse(raw) as User;
    } else {
      // handle missing user (navigate to login, show message, etc.)
      console.warn('No user in sessionStorage');
    }
  }

}
