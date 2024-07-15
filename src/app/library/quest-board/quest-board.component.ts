import {Component, OnInit, Inject, OnChanges, SimpleChanges} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {QuestData, QuestType} from "../../shared-components/quest-data/quest-data";
import {QuestDataService} from "../../shared-components/quest-data/quest-data.service";
import {QuestDisplayComponent} from "../../shared-components/quest-display/quest-display.component";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {QuestCardComponent} from "../../shared-components/quest-card/quest-card.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-quest-board',
  standalone: true,
  imports: [
    NgOptimizedImage,
    QuestDisplayComponent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    QuestCardComponent,
  ],
  template: `
    @switch (activeScreen) {
      @default {
        <div class="quest-board">
          <section class="quest-board-header">
            <h1 mat-dialog-title>Questboard</h1>
            <mat-dialog-actions>
              <button mat-button mat-dialog-close>
                <img ngSrc="assets/images/icons/close.svg" width="22.5" height="26.25" alt="close">
              </button>
            </mat-dialog-actions>
          </section>
          <section class="quest-board-body">
            <section class="quest-board-body-wrapper board">
              @for (quest of generatedQuests; track quest.questId) {
                <app-quest-card (onQuestClickEvent)="openQuestSelection($event)" [questData]="quest"></app-quest-card>
              }
            </section>
          </section>
          <section class="quest-board-footer">
            <button (click)="regenerateQuest()">Regenerate</button>
          </section>
        </div>
      }
      @case (1) {
        <div class="quest-board">
          <section class="quest-board-header">
            <h1 mat-dialog-title>{{ selectedQuest?.questName }}</h1>
            <mat-dialog-actions>
              <button mat-button mat-dialog-close>
                <img ngSrc="assets/images/icons/close.svg" width="22.5" height="26.25" alt="close">
              </button>
            </mat-dialog-actions>
          </section>
          <section class="quest-board-body">
            <section class="quest-board-body-wrapper quest">
              <h2>Goals</h2>
              <p>{{ selectedQuest?.questDescription }}</p>
            </section>
          </section>
          <section class="quest-board-footer">
            <button (click)="closeQuestSelection()">Decline Quest</button>
            <button (click)="addQuest()">Accept Quest</button>
          </section>
        </div>
      }

    }




  `,
  styles: `
  .quest-board{
    width: 100%;
  }

  .quest-board-header{
    margin: 0;
    padding: 12px;
    justify-content: space-between;
    align-items: center;
    background: #474747;
    display: flex;
    flex-direction: row;
    height: 64pt;
  }

  .quest-board-header h1{
    color: white;
    font-size: 32pt;
    margin: 0;
    /*width: 100%;*/
  }

  .quest-board-header button{
    background: none;
  }

  .quest-board-body{
    background: #D8D8D8;
    max-width: 100%;
    padding: 12pt;
    min-height: 400pt;
  }

  .quest-board-body-wrapper {
    &.board {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-content: flex-start;
    }

    &.quest {
      display: flex;
      flex-direction: column;
      align-content: flex-start;
      justify-content: space-between;
    }

    h2 {
      font-size: 16pt;
    }

    p {
      font-size: 12pt;
    }
  }



  .quest-board-footer{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: #474747;
    width: 100%;
    height: 80pt;
  }

  .quest-board-footer button{
    background: #FFB951;
    height: 46pt;
    color: #1F1F1F;
    border-radius: 8pt;
    border: none;
    margin: 12pt;
    flex-grow: 1;
  }
  `
})
export class QuestBoardComponent implements OnInit, OnChanges{
  public generatedQuests : QuestData[] | undefined;
  public activeScreen : number = 0;
  public selectedQuest : QuestData | undefined;

  constructor(private questDataService : QuestDataService, @Inject(MAT_DIALOG_DATA) public data : {gameId : number}, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getData()
    this.reloadComponent(true)
    // location.reload()
  }

  ngOnInit() {
    this.getData();
    this.reloadComponent(true)
  }

  private getData(){
    const gameId = this.data.gameId;
    this.questDataService.getGeneratedQuests(gameId).subscribe(questData => this.generatedQuests = questData)
  }

  openQuestSelection(quest : QuestData){

    this.questDataService.generateQuests(this.data.gameId);
    this.activeScreen = 1;
    this.selectedQuest = quest;
    console.log(`show quest screen ${quest.questName}`)
  }

  closeQuestSelection() {
    this.activeScreen = 0;
    this.getData()
    console.log('hide quest screen')
  }

  addQuest(){
    if(this.selectedQuest){
      this.questDataService.acceptQuest(this.data.gameId, this.selectedQuest.questId);
    }
    location.reload()
    this.activeScreen = 0;
  }

  regenerateQuest() {
    this.questDataService.generateQuests(this.data.gameId);
    this.reloadComponent(true)
    this.getData()
  }

  // this is the function that reloads the component, yse on change and possibly on other function calls as well
  // currently reloads whole site, need to figure out how to reload only the popup window (if that's even possible)
  reloadComponent(self:boolean,urlToNavigateTo ?:string){
    //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:",this.router.url);
    const url=self ? this.router.url :urlToNavigateTo;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`/${url}`]).then(()=>{
        console.log(`After navigation I am on:${this.router.url}`)
      })
    })
  }

}
