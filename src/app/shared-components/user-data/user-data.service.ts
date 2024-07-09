import { Injectable } from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) {
  }

  //OPTIMIZE create own service user data
  //Get Data: IDOfGamesOwned
  public getIDsOfGamesOwned(): Observable<number[]> {
    const url = 'http://127.0.0.1:5000/api/users/test/owned-game-ids';
    return this.http.get<number[]>(url).pipe(tap(_ => console.log('fetched IDs')),
      catchError(this.handleError<number[]>('getIDsOfGamesOwned')));
  }

  public userOwnsGame(gameID: number): boolean {
    let gameIDs: number[] | undefined;
    this.getIDsOfGamesOwned().subscribe(res => gameIDs = res);
    if (gameIDs)
      return gameIDs.includes(gameID);
    return false;
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
