import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Wine } from '../wine';
import { WineApiService } from '../wine-api.service';
import { from as fromPromise } from 'rxjs';

@Component({
  selector: 'app-wine-item-page',
  template: `
  <app-wine-item-content [wine]="wine"></app-wine-item-content>
  <div class="row text-center"><button mat-button class="mx-auto mt-3" color="primary" routerLink="/wines">Retour à la liste des Vins</button></div>
  `,
  styles: []
})
export class WineItemPageComponent implements OnInit {
  wine: Wine;

  constructor(private route: ActivatedRoute, private wineApi: WineApiService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.info(id)
    this.wineApi.get(+id).subscribe((wine: Wine)=> this.wine = wine);
    
  }

}