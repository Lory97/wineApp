import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Wine } from './wine';
import { Observable, Subject } from 'rxjs';

const PARAM_NAME_SKIP = 'skip';
const PARAM_NAME_LIMIT = 'limit';
const PARAM_NAME_SORT = 'sort';
const PARAM_NAME_FILTER = 'q';
const BASE_API_URL = 'http://localhost:4000';

export class WinesQueryResponse {
  totalCount: number;
  incompleteResults: boolean;
  items: Array<Wine>;
}

@Injectable()
export class WineApiService {
  private winesUrl = 'api/wines';
  public created$ : Subject<Wine> = new Subject<Wine>();
  public removed$ : Subject<number> = new Subject<number>();
  


  constructor(private http : HttpClient) {}

  getWines() : Promise<Wine[]>{
    return this.http.get(`${BASE_API_URL}/${this.winesUrl}`)
      .toPromise()
      .then(response => response['items'] as Wine[])
      .catch(this.handleError);
  }

  getImageSourceUrl(wineId: number): string {
    return `${BASE_API_URL}/${this.winesUrl}/${wineId}/picture`;
  }

  public save(wine: Wine): Promise<Wine> {
    return this.http.post(`${BASE_API_URL}/${this.winesUrl}`, wine)
      .toPromise()
      .then(response => {
        this.created$.next(wine);
        return response as Wine;
      })
      .catch(this.handleError);
  };

  public delete(wine: Wine): Promise<boolean> {
    return this.http.delete(`${BASE_API_URL}/${this.winesUrl}/${wine.id}`)
      .toPromise()
      .then(response => {
        this.removed$.next(wine.id);
        return true;
      })
      .catch(this.handleError);
  };

  /**
   * query on server
   */
  public query(filterParams?: Array<string>, sortParams?: string, skipValue?: number, limitValue?: number): Promise<WinesQueryResponse> {
    const options = {params : undefined};

    //this.openDialog();

    if (filterParams && (filterParams.length > 0)) { 
      let filterForQuery = '';
      filterParams.forEach(filter => {
        if (filterForQuery.length > 0) {
          filterForQuery += '+';
        }
        filterForQuery += filter;
      });

      console.log(filterForQuery);
      
      options.params = filterForQuery ?  new HttpParams().set(PARAM_NAME_FILTER, filterForQuery) : {};

      //options.params[PARAM_NAME_FILTER] = filterForQuery;

      console.log(`WineManagerServiceImpl : ${options.params}`);
    }

    if (sortParams) {
      options.params[PARAM_NAME_SORT] = sortParams;
      // this.logger.log(`WineManagerServiceImpl : ${PARAM_NAME_SORT}=${options.params[PARAM_NAME_SORT]}`);
    }

    if (skipValue) {
      options.params[PARAM_NAME_SKIP] = skipValue;
      // this.logger.log(`WineManagerServiceImpl : ${PARAM_NAME_SKIP}=${skipValue}`);
    }

    if (limitValue) {
      options.params[PARAM_NAME_LIMIT] = limitValue;
      // this.logger.log(`WineManagerServiceImpl : ${PARAM_NAME_LIMIT}=${limitValue}`);
    }

    console.log(options);

    return this.http.get(`${BASE_API_URL}/${this.winesUrl}`, options)
      .toPromise()
      .then(response => {
        //this.closeDialog();
        return response as WinesQueryResponse;
      })
      .catch(this.handleError);
  };


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
