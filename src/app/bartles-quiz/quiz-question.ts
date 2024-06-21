export class QuizQuestion {
  question : string;
  option1 : QuizOption;
  option2 : QuizOption;
  answer: string;
  isAnswered : boolean = false;

  constructor(question : string, answer1 : string, answer2 : string,
              outcome1 : string, outcome2 : string, answerGiven : string) {
    this.question = question;
    this.option1 = new QuizOption(answer1, outcome1);
    this.option2 = new QuizOption(answer2, outcome2);
    this.answer = answerGiven;
  }
}

export class QuizOption {
  claim : string;
  value : string;

  constructor(claim : string, value : string) {
    this.claim = claim;
    this.value = value;
  }
}
