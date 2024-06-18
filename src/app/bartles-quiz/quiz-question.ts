export class QuizQuestion {
  question : string;
  option1 : string[]
  option2 : string[]
  answer = null;

  constructor(question : string, answer1 : string, answer2 : string,
              outcome1 : string, outcome2 : string) {
    this.question = question;
    this.option1 = [answer1, outcome1];
    this.option2 = [answer2, outcome2];
  }
}
