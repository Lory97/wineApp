import { Component, OnInit } from '@angular/core';
import { WineApiService } from '../wine-api.service';
import { Wine } from '../wine';

@Component({
  selector: 'app-wine-search-form',
  templateUrl: './wine-search-form.component.html',
  styleUrls: ['./wine-search-form.component.css']
})
export class WineSearchFormComponent implements OnInit {

   result : Array<Wine>;
   private _filter: string;
   private _filters: Array<string>;
   private _sorting: string;
   skipValue: number;
   limitValue: number;


  constructor(private wineApiService : WineApiService) {
    this._filters = new Array();
   }

  ngOnInit() {
  }


  set sorting(sorting: string) {
    console.log(sorting);
    this._sorting = sorting;
    this.update();
  }
  get sorting() {
    return this._sorting;
  }

  set filter(filter: string) {
    this._filter = filter;
    this._filters[0] = `name:${filter}`;
    this.update();
  }

  get filter() {
    return this._filter;
  }


  update() {
    this.wineApiService.query(this._filters, this._sorting, this.skipValue, this.limitValue).subscribe(
      response => {this.result = response.items; console.log(this.result);}
    );
  }


  searchWine(searchData){
    let terms;
    if(searchData){
      if(searchData.term){
        terms = searchData.term.split(" ");
        //console.log(terms);
        this.result = this.wineApiService.searchWine(terms);
        //console.log(this.result);
      }
    }
  }

}
