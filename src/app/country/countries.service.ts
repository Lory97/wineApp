import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Country } from './country';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';

const BASE_API_URL = 'http://localhost:4000/api';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private countriesUrl = 'countries';
  
  constructor(private http : HttpClient) { }

  public getAll(): Observable<Array<Country>> {
    return this.http.get(`${BASE_API_URL}/${this.countriesUrl}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
    return (error.message || error);
  }
}
