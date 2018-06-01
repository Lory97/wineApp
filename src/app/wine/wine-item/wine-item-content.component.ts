import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { WineApiService } from '../wine-api.service';
import { Wine } from '../wine';
import { WineEditFormComponent } from '../wine-edit-form/wine-edit-form.component';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-wine-item-content',
  templateUrl: './wine-item-content.component.html',
  styleUrls: ['./wine-item-content.component.css']
})
export class WineItemContentComponent implements OnInit {
  @Output()
  edit = new EventEmitter();

  @Input()
  wine: Wine;


  constructor(private wineApi: WineApiService) { }


  ngOnInit() {
    console.info(this.wine)
  }

  getWineImage(wineID: number) {
    return this.wineApi.getImageSourceUrl(wineID);
  }

  editWineDialog(wineId: number) {
    console.info('edit')
    this.edit.emit(null);
  }

}
