import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserPageComponent} from './user-page/user-page.component';
import {loginGuard} from './route-guards'
import {HomePageComponent} from './home-page/home-page.component';
import {ChallengePageComponent} from './challenge-page/challenge-page.component';
import {ActivitiesPageComponent} from './activities-page/activities-page.component';
import {SignUpPageComponent} from './sign-up-page/sign-up-page.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full'

},

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users/:userId',
    component: UserPageComponent,
    canMatch: [loginGuard],
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'challenges',
    component: ChallengePageComponent,
    canMatch: [loginGuard],
  },
  {
    path: 'activities',
    component: ActivitiesPageComponent,
    canMatch: [loginGuard],
  },
  {
    path: 'challenges/:challengeId',
    component: ChallengePageComponent,
    canMatch: [loginGuard],
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
  },
  {
    path:'**', redirectTo: 'login'
  }

];
