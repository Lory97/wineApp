import { Component, OnInit , Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { WineApiService } from '../wine-api.service';
import { Wine } from '../wine';

@Component({
  selector: 'app-wine-item',
  templateUrl: './wine-item.component.html',
  styleUrls: ['./wine-item.component.css']
})
export class WineItemComponent implements OnInit {
  wine : Wine;

  constructor(public dialogRef: MatDialogRef<WineItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private wineApi : WineApiService) { }

  ngOnInit() {
    this.wine = this.data;
    console.log(this.data);
  }

  getWineImage(wineID:number){
    return this.wineApi.getImageSourceUrl(wineID);
  }

}
