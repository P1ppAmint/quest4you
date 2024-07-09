import { Injectable } from '@angular/core';
import {catchError, tap, map} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {PlayerType} from "./player-type";
import {PlayerTypeComponent} from "../../player-type/player-type/player-type.component";
import {QuestData, QuestType} from "../quest-data/quest-data";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private baseUrl = 'http://127.0.0.1:5000/api/users/test';

  constructor(private http: HttpClient) {
  }

  //OPTIMIZE create own service user data
  //Get Data: IDOfGamesOwned
  public getIDsOfGamesOwned(): Observable<number[]>
  {
    const url = `${this.baseUrl}/owned-game-ids`;
    return this.http.get<number[]>(url).pipe(tap(_ => console.log('fetched IDs')),
      catchError(this.handleError<number[]>('getIDsOfGamesOwned')));
  }

  public userOwnsGame(gameID: number): boolean
  {
    let gameIDs: number[] | undefined;
    this.getIDsOfGamesOwned().subscribe(res => gameIDs = res);
    if (gameIDs)
      return gameIDs.includes(gameID);
    return false;
  }

  public hasPlayerAnsweredQuiz(): Observable<boolean>
  {
    const url = `${this.baseUrl}/has-answered-quiz`;
    return this.http.get<boolean>(url).pipe(tap(_ => console.log('fetched playerType')),
      catchError(this.handleError<boolean>('hasPlayerAnsweredQuiz')));
  }

  public getUserPlayerType(): Observable<PlayerType>{
    const url = 'http://127.0.0.1:5000/api/users/test/player-type';
    return this.http.get<any>(url).pipe(
      tap(_ => console.log('fetched PlayerType')),
      map(item => this.transformToPlayerType(item)),
      catchError(this.handleError<PlayerType>('getUserPlayerType')));
  }

  private transformToPlayerType(item: any): PlayerType{
    return {
      achiever: item.Achiever,
      explorer: item.Explorer,
      killer: item.Killer,
      socializer: item.Socializer
    };
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
