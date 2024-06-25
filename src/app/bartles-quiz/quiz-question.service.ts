import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { QuizQuestion } from "./quiz-question";

@Injectable({
  providedIn: 'root'
})

export class QuizQuestionService {
  public quizQuestions: QuizQuestion[] = [];
  questionDataset : any;
  answersGiven : any;
  really_finalAnswers: any;

  constructor(private http: HttpClient) {
    this.loadQuestionData()
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

  //retrieve data from server
  public loadQuestionData() {
    this.http.get('http://127.0.0.1:5000/api/bartles_questions').subscribe(res => this.questionDataset = res);
    this.http.get('http://127.0.0.1:5000/api/users/test/answers').subscribe(res => this.answersGiven = res);

    for (let index in this.questionDataset) {
      this.quizQuestions.push(new QuizQuestion(this.questionDataset[index]['question'], this.questionDataset[index]['answer1'],
        this.questionDataset[index]['answer2'], this.questionDataset[index]['outcome1'], this.questionDataset[index]['outcome2'], this.answersGiven[index]))
    }

  }

  public saveQuestionData(finalAnswers : any) {
    // reaches this part of the code!
    // this.loadQuestionData()
    // Stuff needed for a correct post request:
    // - correct header (see above)
    // -> from that create correct headerOPTIONS to make it easier to pass them into the post request
    // - stringify the dictionary to ensure the format is correctly taken by the request
    // CRUCIAL: in app.py enable CORS (Cross-Origin Ressource Sharing) by putting CORS(app) below app definition in first lines
    const json_data = JSON.stringify("{'0': 'YES','1': ''}")
    this.http.post('http://127.0.0.1:5000/api/users/test/final_answers', json_data, this.requestOptions).subscribe(res => this.really_finalAnswers = res)

  }
}
