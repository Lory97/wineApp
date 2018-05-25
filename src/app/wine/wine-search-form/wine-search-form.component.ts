import { Component, OnInit } from '@angular/core';
import { WineApiService } from '../wine-api.service';

@Component({
  selector: 'app-wine-search-form',
  templateUrl: './wine-search-form.component.html',
  styleUrls: ['./wine-search-form.component.css']
})
export class WineSearchFormComponent implements OnInit {

  constructor(private wineApiService : WineApiService) { }

  ngOnInit() {
  }

  searchWine(searchData){
    let terms = searchData.term.split(" ");
    console.log(terms);
    this.wineApiService.query(terms).then( result => console.log(result));
  }

}
