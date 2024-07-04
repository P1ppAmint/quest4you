import {Component, Input, numberAttribute} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  template: `
    <button class="game-card-button">
      <img ngSrc="assets/images/game-cards/{{gameID}}_cover.png" width="220" height="300" alt="">
    </button>
  `,
  styles: `
    .game-card-button {
      border: none;
      border-radius: 40pt;
      box-sizing: content-box;
      padding: 0;
      overflow: hidden;
    }
  `
})
export class GameCardComponent {
  @Input({required: true, transform: numberAttribute}) gameID : number = 0;
}
