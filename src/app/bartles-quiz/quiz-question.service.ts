import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { QuizQuestion } from "./quiz-question";

@Injectable({
  providedIn: 'root'
})

export class QuizQuestionService {
  public quizQuestions: QuizQuestion[] = [];
  questionDataset : any;
  answersGiven : any;

  constructor(private http: HttpClient) {
    this.loadQuestionData()
  }

  //retrieve data from server
  private loadQuestionData() {
    this.http.get('http://127.0.0.1:5000/api/bartles_questions').subscribe(res => this.questionDataset = res);
    this.http.get('http://127.0.0.1:5000/api/users/test/answers').subscribe(res => this.answersGiven = res);

    for (let index in this.questionDataset) {
      this.quizQuestions.push(new QuizQuestion(this.questionDataset[index]['question'], this.questionDataset[index]['answer1'],
        this.questionDataset[index]['answer2'], this.questionDataset[index]['outcome1'], this.questionDataset[index]['outcome2'], this.answersGiven[index]))
    }
  }
}
