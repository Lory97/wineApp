import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Country } from './country';

@Injectable()
export class CountriesService {
  private countriesUrl = 'countries';

  constructor(private http : HttpClient, @Inject('BASE_API') private baseApi: string ) { }

    /**
   * get all countries
   * @returns {Promise<Array<Country>>}
   */
  public getAll(): Promise<Array<Country>> {
    return this.http.get(`${this.baseApi}/${this.countriesUrl}`)
      .toPromise()
      .then(response => {
        return response as Array<Country>;
      })
      .catch(this.handleError);
  }

  /**
   * get country associated to giving country code (3 characters) 
   * @param {string} code
   * @returns {Promise<Country>}
   */
  get(code: string): Promise<Country> {
    return this.http.get(`${this.baseApi}/${this.countriesUrl}/${code}`)
      .toPromise()
      .then(response => {
        return response  as Country;
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
