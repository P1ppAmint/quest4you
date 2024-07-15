import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {QuizQuestionService} from "../quiz-question.service";
import {QuizQuestionData} from "../quiz-question-data";
import {Location} from "@angular/common";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit, OnChanges{
  progressbarIndicatorWindow : number = 4;

  quizQuestions : QuizQuestionData[] = [];

  currentQuizQuestion : QuizQuestionData = new QuizQuestionData(0,"", "", "", "", "", "");

  currentQuestionIndex : number = 0;
  quizLength : number = 0;

  //just for debugging TODO remove later
  result : {[resultType : string] : number} = {'+A': 0, '+E' : 0, '+S' : 0, '+K' : 0 };

  constructor(private quizQuestionService: QuizQuestionService, private location : Location) {}

  ngOnInit(): void {
    this.getData()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getData()
  }

  private getData() : void {
    this.quizQuestionService.loadQuestions().subscribe(questions =>
    {
      this.quizQuestions = questions;
      this.loadQuestionData(this.currentQuestionIndex);
      this.quizLength = this.quizQuestions.length;
    });
  }



  public onAnswer(answer : string) : void  {
    //TODO externalize result calculation
    this.result[answer] += 1;
    this.currentQuizQuestion.answer = answer;
    this.currentQuizQuestion.isAnswered = true;

    this.currentQuestionIndex++;
    if (this.checkQuizCompletion()) {
      console.log('Quiz finished!')
      this.finishQuiz()

    } else {
      //load next questions
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

    //save data
    this.quizQuestionService.saveQuestionData(this.quizQuestions);
    //load result screen
    this.location.back();

  }

  private checkQuizCompletion() : boolean {
    let allAnswered : boolean = true;
    this.quizQuestions.forEach((quizQuestion : QuizQuestionData) => {
      if (!quizQuestion.isAnswered) allAnswered = false;
    })
    console.log(allAnswered)
    return allAnswered;
  }

  public skipQuiz(): void {
    this.finishQuiz()
  }

}
