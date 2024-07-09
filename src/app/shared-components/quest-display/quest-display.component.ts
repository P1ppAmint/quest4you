import {Component, Input} from '@angular/core';
import {QuestCardComponent} from "../quest-card/quest-card.component";
import {QuestData} from "../quest-data/quest-data";

@Component({
  selector: 'app-quest-display',
  standalone: true,
  imports: [
    QuestCardComponent
  ],
  templateUrl: './quest-display.component.html',
  styleUrl: './quest-display.component.scss'
})
export class QuestDisplayComponent {
  @Input({required: true}) quests : QuestData[] = [];
  @Input() title : string = '';
}
