import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Wine } from '../wine';
import { WineApiService } from '../wine-api.service';
import { from as fromPromise } from 'rxjs';

@Component({
  selector: 'app-wine-item-page',
  template: `
  <app-wine-item-content [wine]="wine"></app-wine-item-content>
  `,
  styles: []
})
export class WineItemPageComponent implements OnInit {
  wine: Wine;

  constructor(private route: ActivatedRoute, private wineApi: WineApiService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.info(id)
    fromPromise(this.wineApi.get(+id)).subscribe((wine: Wine)=> this.wine = wine);
    
  }

}