import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

import {QuizQuestionService} from "../quiz-question.service";

import {QuizQuestion} from "../quiz-question";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit{
  progressbarIndicatorWindow : number = 4;

  quizQuestions : QuizQuestion[] = [];

  currentQuizQuestion : QuizQuestion = new QuizQuestion("","", "", "", "", "");

  currentQuestionIndex : number = 0;
  quizLength : number = 0;

  //just for debugging remove later
  result : {[resultType : string] : number} = {'+A': 0, '+E' : 0, '+S' : 0, '+K' : 0 };

  constructor(private quizQuestionService: QuizQuestionService) {}

  ngOnInit(): void {
    this.getData()
  }

  getData() : void {
    this.quizQuestions = this.quizQuestionService.quizQuestions;
    this.quizLength = this.quizQuestions.length;
    this.loadQuestionData(this.currentQuestionIndex)
  }


  public onAnswer(answer : string) : void  {
    //TODO externalize result calculation
    this.result[answer] += 1;
    this.currentQuizQuestion.answer = answer;
    this.currentQuizQuestion.isAnswered = true;

    this.currentQuestionIndex++;
    if (this.checkQuizCompletion()) {
      this.finishQuiz()
    } else {
      //laod next questions
      this.changeQuestion(this.currentQuestionIndex)
    }

  }

  public previousQuestion() : void {
    this.currentQuestionIndex--;
    this.changeQuestion(this.currentQuestionIndex)
  }

  public nextQuestion() : void {
    this.currentQuestionIndex++;
    this.changeQuestion(this.currentQuestionIndex)
  }

  public changeQuestion(index : number) : void  {
    this.currentQuestionIndex = index;
    this.loadQuestionData(this.currentQuestionIndex);
  }

  private loadQuestionData(index : number) : void{
    this.currentQuizQuestion = this.quizQuestions[index];
  }

  public finishQuiz() : void {

  }

  private checkQuizCompletion() : boolean {
    let allAnswered : boolean = true;
    this.quizQuestions.forEach((quizQuestion : QuizQuestion) => {
      if (!quizQuestion.isAnswered) allAnswered = false;
    })
    return allAnswered
  }

}
