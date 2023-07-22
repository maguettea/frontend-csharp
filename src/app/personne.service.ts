import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable,throwError } from 'rxjs';
import { Personne } from './personne';
import { retry, catchError } from 'rxjs/operators';

const baseURL= "https://localhost:44387/api/personnes";


@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  constructor(private httpClient:HttpClient) {}
    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
    getPersonnesList(): Observable<Personne>{
      return this.httpClient.get<Personne>(baseURL)
      ; 
   }
   getPersonne(Id:any):Observable<Personne>{
    return this.httpClient.get<Personne>(`${baseURL}/${Id}`);
   }

   createPersonne(data): Observable<Personne> {
    return this.httpClient.post<Personne>(
      baseURL, JSON.stringify(data),
      this.httpOptions)
      .pipe(retry(1),catchError(this.errorHandle));
  }
  updatePersonne(Id:number, data:Personne): Observable<Personne> {
    return this.httpClient
      .put<Personne>(
        `${baseURL}/${Id}`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandle));
  }

  deletePersonne(Id:number): Observable<Personne> {
    return this.httpClient.delete<Personne>(`${baseURL}/${Id}`,this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandle));
  }

  errorHandle(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}