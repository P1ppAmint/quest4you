import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuestData, QuestType} from "./quest-data";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuestDataService {

  private  baseUrl = 'http://127.0.0.1:5000/api/users/test/';

  constructor(private http: HttpClient) {
  }


  public getGeneratedQuests(gameId: number): Observable<QuestData[]> {
    const url = `${this.baseUrl}${gameId}/generated-quests`;
    return this.http.get<any[]>(url).pipe(
      tap(_ => console.log(`fetched generatedQuests id = ${gameId}`)),
      map(data => data.map(item => this.transformToQuestData(item, QuestType.generated))),
      catchError(this.handleError<QuestData[]>(`getGeneratedQuests id=${gameId}`))
    );
  }

  public getAcceptedQuests(gameId: number): Observable<QuestData[]> {
    const url = `${this.baseUrl}${gameId}/accepted-quests`;
    return this.http.get<any[]>(url).pipe(
      tap(_ => console.log(`fetched generatedQuests id = ${gameId}`)),
      map(data => data.map(item => this.transformToQuestData(item, QuestType.generated))),
      catchError(this.handleError<QuestData[]>(`getGeneratedQuests id=${gameId}`))
    );
  }


  //Get Data: All Vanilla Achievements of the Game
  public getVanillaQuests(gameId : number) : Observable<QuestData[]> {
    const url = `http://127.0.0.1:5000/api/games/${gameId}/vanilla-quests`
    return this.http.get<any[]>(url).pipe(
      tap(_ => console.log(`fetched vanillaQuests id = ${gameId}`)),
      map(data => data.map(item => this.transformToQuestData(item, QuestType.vanilla))),
      catchError(this.handleError<QuestData[]>(`getVanillaQuests id=${gameId}`))
    );
  }


  private transformToQuestData(item: any, questType : QuestType = QuestType.generated): QuestData {
    return {
      questId: item.QuestId,
      questName: item.QuestName,
      questDescription: item.QuestDescription,
      questStatus: item.QuestStatus,
      questType: questType,
    };
  }


  //Set Data: AcceptedQuest
  public acceptQuest(gameId : number, questId : number): void{
    const url = `${this.baseUrl}${gameId}/accept-quest/${questId}`;
    this.http.get(url);
  }


  //Action: ActivateQuestGenerationProcess
  public generateQuests(gameId : number): void {
    console.log("Quest Service: Received generation request")
    const url = `${this.baseUrl}${gameId}/generate-quests`;
    this.http.get(url);
  }


  private handleError<T>(operation = 'operation', result?:T) {
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
