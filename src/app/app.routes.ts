import { Routes } from '@angular/router';
import {LibraryComponent} from "./library/library/library.component";
import {PlayerTypeComponent} from "./player-type/player-type/player-type.component";
import {HomeComponent} from "./home/home.component";
import {QuizComponent} from "./player-type/quiz/quiz/quiz.component";
import {QuestsComponent} from "./quests/quests.component";
import {AccountComponent} from "./account/account.component";
import {SocialComponent} from "./social/social.component";
import {GamePageComponent} from "./library/game-page/game-page.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'quiz',
    component: QuizComponent,
    title: 'Quiz',
  },
  {
    path: 'library',
    component: LibraryComponent,
    title: 'Library'
  },
  {
    path: 'player-type',
    component: PlayerTypeComponent,
    title: 'PlayerType'
  },
  {
    path: 'quests',
    component: QuestsComponent,
    title: 'Quests'
  },
  {
    path: 'social',
    component: SocialComponent,
    title: 'Social'
  },
  {
    path: 'account',
    component: AccountComponent,
    title: 'Account'
  },
  {
    path: 'game-page/:id',
    component: GamePageComponent,
    title: 'Game Page'
  }
];
