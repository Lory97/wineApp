import { Component, OnInit } from '@angular/core';
import { WineApiService } from '../wine-api.service';
import { Wine } from '../wine';

@Component({
  selector: 'app-wine-search-form',
  templateUrl: './wine-search-form.component.html',
  styleUrls: ['./wine-search-form.component.css']
})
export class WineSearchFormComponent implements OnInit {

  private result : Array<Wine>

  constructor(private wineApiService : WineApiService) { }

  ngOnInit() {
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
