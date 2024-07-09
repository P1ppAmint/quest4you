import {Component, Input, Output, EventEmitter} from '@angular/core';
import {QuestData} from "../quest-data/quest-data";

@Component({
  selector: 'app-quest-card',
  standalone: true,
  imports: [],
  template: `
    @if (questData)
    {
      <button (click)="onClick()">
        <div class="quest-container">
          <div class="quest-icon {{questData.questType}} {{questData.questStatus}}"></div>
          <p class="quest-name">{{questData.questName}}</p>
        </div>
      </button>
    }
  `,
  styles: `
    button {
      background: none;
      border: none;
    }
    .quest-icon {
      height: 80pt;
      width: 80pt;
      background: #FFB951;
      border-radius: 4pt;

      &.vanilla {
        &.completed {
          background: #5197FF;
        }
        &.ongoing {
          background: #9ACBFF;
        }
      }
      &.generated {
        &.completed {
          background: #FFB951;
        }
        &.ongoing {
          background: #FFE1B4;
        }
      }
    }
    .quest-container{
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 4px;
    }

    p {
      font-size: 11pt;
    }
  `
})
export class QuestCardComponent {
  @Input({required: true}) questData : QuestData | undefined;
  @Output() onQuestClickEvent = new EventEmitter<QuestData>();

  onClick(){
    this.onQuestClickEvent.emit(this.questData)
  }
}


