import { Routes } from '@angular/router';
import {LoadingScreenComponent} from "./loading-screen/loading-screen.component";
import {LibraryComponent} from "./library/library/library.component";
import {PlayertypeComponent} from "./playertype/playertype/playertype.component";
import {HomeComponent} from "./home/home.component";
import {QuizComponent} from "./playertype/quiz/quiz/quiz.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'quiz',
    component: QuizComponent,
    title: 'Quiz',
  },
  {
    path: 'loadingScreen',
    component: LoadingScreenComponent,
    title: 'Loading...'
  },
  {
    path: 'library',
    component: LibraryComponent,
    title: 'Library'
  },
  {
    path: 'playertype',
    component: PlayertypeComponent,
    title: 'Playertype'
  }
];
