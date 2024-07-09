export interface QuestData {
  //gameID : number;
  questId : number;
  questName : string;
  questDescription : string;
  questStatus : string;
  questType : QuestType;
}

export enum QuestStatus{
  completed = 'completed',
  ongoing = 'ongoing',
}

export enum QuestType {
  vanilla = "vanilla",
  generated = "generated"
}
