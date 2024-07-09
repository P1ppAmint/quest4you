import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from "rxjs";

import {GameData} from "./game-data";

@Injectable({
  providedIn: 'root'
})
export class GameDataService{
  constructor(private http: HttpClient) {
  }


  public getGameData(gameID : number) : Observable<GameData> {
    const url = `http://127.0.0.1:5000/api/games/${gameID}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched gameData id = ${gameID}`)),
      map(item => this.transformToGameData(item)),
      catchError(this.handleError<GameData>(`getGameData id=${gameID}`))
    );
  }

  private transformToGameData(item:any) : GameData{
    return {
      gameId: item.GameId,
      title: item.Title
    }
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
