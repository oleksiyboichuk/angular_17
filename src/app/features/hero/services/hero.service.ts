import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {HeroModel} from "../models/hero.model";
import {MessageService} from "../../messages/services/message.service";


@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  getHeroes(): Observable<HeroModel[]> {
    return this.http.get<HeroModel[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<HeroModel[]>('getHeroes', []))
      );
  }

  getHeroNo404<Data>(id: number): Observable<HeroModel> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<HeroModel[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<HeroModel>(`getHero id=${id}`))
      );
  }

  getHero(id: number): Observable<HeroModel> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<HeroModel>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<HeroModel>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<HeroModel[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<HeroModel[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<HeroModel[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  addHero(hero: HeroModel): Observable<HeroModel> {
    return this.http.post<HeroModel>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: HeroModel) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<HeroModel>('addHero'))
    );
  }

  deleteHero(id: number): Observable<HeroModel> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<HeroModel>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<HeroModel>('deleteHero'))
    );
  }

  updateHero(hero: HeroModel): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
