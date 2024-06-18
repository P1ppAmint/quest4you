import { Component, OnInit } from '@angular/core';
import { BackendCommunicationService} from "./backend/communication-management/backend-communication.service";

import { RouterOutlet } from '@angular/router';
import { QuizComponent } from "./bartles-quiz/quiz/quiz.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'quest4you';

  newdata:any;

  constructor(private backendCommunicationService : BackendCommunicationService) {

  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.backendCommunicationService.getData().subscribe(res => {
      this.newdata=res;
    })
  }
}
