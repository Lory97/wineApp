import { Component, OnInit } from '@angular/core';
import { WineApiService } from '../wine-api.service';
import { Wine } from '../wine';
import { filter } from 'rxjs/operators';

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
   nb_result : number;
   activeSearch = false;
   inactivityTimeout :any;




  constructor(private wineApiService : WineApiService) {
    this._filters = new Array();
   }

  ngOnInit() {

    this.wineApiService.search$.subscribe(
      data =>{
        if(data.length > 0){
          this.nb_result = data.length;
        }else{
          console.log('no term in search, load initial wines list')
          this.nb_result = 0;
        }
      }

    )
  }


  resetSearch(){
    this.activeSearch = false;
    this._filter = '';
    this._filters[0] = `name:${this._filter}`;
    this.update();
  }


  set sorting(sorting: string) {
    this._sorting = sorting;
    this.update();
  }
  get sorting() {
    return this._sorting;
  }


  setInputValue(){
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(()=>{
      console.log(this._filter);
      console.log('500ms timeout');
      this.update();
    },500);
  }

  set filter(filter: string) {

      this._filter = filter;
      this._filters[0] = `name:${filter}`;
      if(this._filter) this.activeSearch = true;
      else this.activeSearch = false;
      //this.update();
  }

  get filter() {
    return this._filter;
  }


  update() {
    this.wineApiService.query(this._filters, this._sorting, this.skipValue, this.limitValue).subscribe(
      response => {this.result = response.items; console.log(this.result);}
    );
  }

}
