import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-player-type',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './player-type.component.html',
  styleUrl: './player-type.component.scss'
})
export class PlayerTypeComponent {
  hasTakenQuiz: boolean = false;
}
