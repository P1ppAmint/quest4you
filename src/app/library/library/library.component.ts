import { Component, OnInit} from '@angular/core';
import {GameCardComponent} from "../game-card/game-card.component";
import {UserDataService} from "../../shared-components/user-data/user-data.service";

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [GameCardComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})

export class LibraryComponent implements OnInit{
  ownedGamesByID : number[] | undefined;

  constructor(private userDataService : UserDataService) {
  }

  ngOnInit() : void {
    this.getOwnedGames();
  }

  getOwnedGames() : void {
    this.userDataService.getIDsOfGamesOwned().subscribe(gameIDs => this.ownedGamesByID = gameIDs);
  }
}
