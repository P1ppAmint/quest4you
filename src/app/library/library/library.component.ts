import { Component } from '@angular/core';
import {GameCardComponent} from "../game-card/game-card.component";

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [GameCardComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})

export class LibraryComponent {

}
