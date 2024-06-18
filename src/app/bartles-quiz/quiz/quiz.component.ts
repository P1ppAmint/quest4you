import { Component } from '@angular/core';
import questions from '../../../../public/assets/data/bartles-questions.json';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent{
  progressbarIndicatorWindow : number = 4;

  currentQuestionIndex : number = 0;

  //TODO replace later with quiz-service
  questions : any = questions

  question : string = '';
  option1 = ['', '']
  option2 = ['', '']
  result : {[resultType : string] : number} = {'+A': 0, '+E' : 0, '+S' : 0, '+K' : 0 }

  quizLength : number = questions.length;

  ngOnInit(): void {
    this.loadData(0)
  }

  public onAnswer(answer : string) : void  {
    //TODO externalize result calculation
    this.result[answer] += 1;
    //add index overflow behavior

    this.currentQuestionIndex++;
    //laod next questions
    this.changeQuestion(this.currentQuestionIndex)
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
    this.loadData(this.currentQuestionIndex);
  }

  private loadData(index : number) : void{
    this.question = questions[index].question;
    this.option1 = [questions[index].answer1, questions[index].outcome1];
    this.option2 = [questions[index].answer2, questions[index].outcome2];
  }

  public finishQuiz() : void {

  }

}
