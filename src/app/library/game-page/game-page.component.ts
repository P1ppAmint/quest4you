import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import {QuestDisplayComponent} from "../../shared-components/quest-display/quest-display.component";
import {QuestData} from "../../shared-components/quest-data/quest-data";
import {QuestDataService} from "../../shared-components/quest-data/quest-data.service";
import {GameDataService} from "../../shared-components/game-data/game-data.service";
import {GameData} from "../../shared-components/game-data/game-data";

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    QuestDisplayComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent implements OnInit{
  route: ActivatedRoute = inject(ActivatedRoute);
  questsToDisplay : QuestData[] = [];
  gameData : GameData | undefined;
  vanillaQuests : QuestData[] | undefined;
  acceptedQuests : QuestData[] | undefined;


  constructor(private gameDataService : GameDataService, private questDataService : QuestDataService) {
  }

  ngOnInit() {
    this.getGameData();
  }

  getGameData(): void {
    const gameId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.gameDataService.getGameData(gameId).subscribe(gameData => this.gameData = gameData);
    this.questDataService.getVanillaQuests(gameId).subscribe(vanillaQuests => this.vanillaQuests = vanillaQuests)
    this.questDataService.getAcceptedQuests(gameId).subscribe(acceptedQuests => this.acceptedQuests = acceptedQuests)

  }


}
