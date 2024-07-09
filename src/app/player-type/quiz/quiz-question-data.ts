export class QuizQuestionData {
  questionId : number;
  question : string;
  option1 : QuizOption;
  option2 : QuizOption;
  answer : string;
  isAnswered : boolean;

  constructor(questionId: number, question : string, answer1 : string, answer2 : string,
    outcome1 : string, outcome2 : string, answerGiven : string) {
    this.questionId = questionId
    this.question = question;
    this.option1 = new QuizOption(answer1, outcome1);
    this.option2 = new QuizOption(answer2, outcome2);
    this.answer = answerGiven;
    this.isAnswered = false
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

