import {Component, inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import {QuestDisplayComponent} from "../../shared-components/quest-display/quest-display.component";
import {QuestData} from "../../shared-components/quest-data/quest-data";
import {QuestDataService} from "../../shared-components/quest-data/quest-data.service";
import {GameDataService} from "../../shared-components/game-data/game-data.service";
import {GameData} from "../../shared-components/game-data/game-data";
import {MatDialog} from "@angular/material/dialog";
import {QuestBoardComponent} from "../quest-board/quest-board.component";

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    QuestDisplayComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent implements OnInit, OnChanges{
  route: ActivatedRoute = inject(ActivatedRoute);
  gameData : GameData | undefined;
  vanillaQuests : QuestData[] | undefined;
  acceptedQuests : QuestData[] | undefined;
  gameId : number = 0;


  constructor(private gameDataService : GameDataService, private questDataService : QuestDataService, public dialog : MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getGameData();
  }

  ngOnInit() {
    this.getGameData();
  }

  getGameData(): void {
    const gameId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.gameId = gameId;
    this.gameDataService.getGameData(gameId).subscribe(gameData => this.gameData = gameData);
    this.questDataService.getVanillaQuests(gameId).subscribe(vanillaQuests => this.vanillaQuests = vanillaQuests)
    // this.questDataService.getGeneratedQuests(gameId).subscribe(acceptedQuests => this.acceptedQuests = acceptedQuests)
    this.questDataService.getAcceptedQuests(gameId).subscribe(acceptedQuests => this.acceptedQuests = acceptedQuests)
    // TODO revert to acceptedQuest
  }

  // implement reload functionality here, that stuff gets updated on load :]
  // atm the achievements are displayed incorrectly, so it'd be nice if we fix that

  generateQuests(): void {
    console.log("Frontend trigger quest generation")
    this.questDataService.generateQuests(this.gameId);
    // open QuestBoard
    this.openDialog()
  }

  openDialog(): void{
    this.dialog.open(QuestBoardComponent, {
      data : { gameId: this.gameId },
      width: '600px'
    });
  }

}
