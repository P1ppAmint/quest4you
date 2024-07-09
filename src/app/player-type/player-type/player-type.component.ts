import { Component, OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import {PlayerType} from "../../shared-components/user-data/player-type";
import {UserDataService} from "../../shared-components/user-data/user-data.service";
import {PlayerTypeChartComponent} from "../player-type-chart/player-type-chart.component";

@Component({
  selector: 'app-player-type',
  standalone: true,
  imports: [
    RouterLink,
    PlayerTypeChartComponent,
  ],
  templateUrl: './player-type.component.html',
  styleUrl: './player-type.component.scss'
})
export class PlayerTypeComponent implements OnInit{
  hasTakenQuiz: boolean = false;
  playerType : PlayerType | undefined;


  constructor(private userDataService : UserDataService) {}

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.userDataService.hasPlayerAnsweredQuiz().subscribe(res => this.hasTakenQuiz = res)
    this.userDataService.getUserPlayerType().subscribe(playerType => {
      this.playerType = playerType
    });
  }

}
