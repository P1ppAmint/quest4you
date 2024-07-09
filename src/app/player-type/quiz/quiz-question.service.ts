import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {QuizQuestionData, QuizOption } from "./quiz-question-data";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {PlayerType} from "../../shared-components/user-data/player-type";

@Injectable({
  providedIn: 'root'
})

export class QuizQuestionService {

  constructor(private http: HttpClient) {
  }

  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Request-Method': 'POST',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  public loadQuestions() : Observable<QuizQuestionData[]>{
    const url = 'http://127.0.0.1:5000/api/questions';
    return this.http.get<any[]>(url).pipe(
      tap(_ => console.log('fetched Questions')),
      map(data => data.map(item => this.transformToQuizQuestion(item))),
      catchError(this.handleError<QuizQuestionData[]>('getQuestionDataSet'))
    );

  }

  public getQuestionSetLength() : Observable<number>{
    const url = 'http://127.0.0.1:5000/api/questions/length';
    return this.http.get<number>(url).pipe(
      tap(_ => console.log('fetched Question Dataset size')),
      catchError(this.handleError<number>('getQuestionSetLength'))
    );
  }

  // public loadQuizQuestion(questionId : number) : Observable<QuizQuestionData>{
  //   const url = `http://127.0.0.1:5000/api/bartles-questions/${questionId}`;
  //   return this.http.get<any>(url).pipe(
  //     tap(_ => console.log(`fetched Question with ${questionId}`)),
  //     map(item => this.transformToQuizQuestion(item)),
  //     catchError(this.handleError<QuizQuestionData>('getUserPlayerType')
  //   ));
  // }
  //
  // private transformToQuizQuestion(item: any): QuizQuestionData{
  //   return {
  //     questionId: item.QuestionId,
  //     question: item.Question,
  //     option1: new QuizOption(item.Answer1, item.Outcome1),
  //     option2: new QuizOption(item.Answer2, item.Outcome2),
  //   }
  // }

  private transformToQuizQuestion(item: any): QuizQuestionData{
    return new QuizQuestionData(
      item.QuestionId,
      item.Question,
      item.Answer1,
      item.Answer2,
      item.Outcome1,
      item.Outcome2,
      item.AnswerGiven
    )
  }

  // public isQuestionAnswered(questionId : number) : Observable<boolean>{
  //   const url = `http://127.0.0.1:5000/api/users/test/answer/${questionId}/status`;
  //   return this.http.get<boolean>(url).pipe(
  //     tap(_ => console.log(`fetched Question ${questionId}`)),
  //     catchError(this.handleError<boolean>('getQuizQuestion'))
  //   );
  // }
  //
  // public loadAnswer(questionId : number): Observable<string>{
  //   const url = `http://127.0.0.1:5000/api/users/test/answer/${questionId}`;
  //   return this.http.get<string>(url).pipe(
  //     tap(_ => console.log(`fetched Answer form Question ${questionId}`)),
  //     catchError(this.handleError<string>('getUserPlayerType'))
  //   );
  // }

  public saveQuestionData(quizQuestions : QuizQuestionData[]) {
    // reaches this part of the code!
    // this.loadQuestionData()
    // Stuff needed for a correct post request:
    // - correct header (see above)
    // -> from that create correct headerOPTIONS to make it easier to pass them into the post request
    // - stringify the dictionary to ensure the format is correctly taken by the request
    // CRUCIAL: in app.py enable CORS (Cross-Origin Resource Sharing) by putting CORS(app) below app definition in first lines
    let answers : {[id : number] : string } = {};

    for (let question of quizQuestions){
      answers[`${question.questionId}`] = question.answer;
    }

    const json_data = JSON.stringify(answers)
    let result;
    this.http.post('http://127.0.0.1:5000/api/users/test/answer_quiz', json_data, this.requestOptions).subscribe(res => result = res)

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
