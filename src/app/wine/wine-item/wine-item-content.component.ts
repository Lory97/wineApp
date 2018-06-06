import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { WineApiService } from '../wine-api.service';
import { Wine } from '../wine';
import { WineEditFormComponent } from '../wine-edit-form/wine-edit-form.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-wine-item-content',
  templateUrl: './wine-item-content.component.html',
  styleUrls: ['./wine-item-content.component.css']
})
export class WineItemContentComponent implements OnInit {
  @Output()
  edit = new EventEmitter<number>();

  @Input()
  wine: Wine;


  constructor(public dialog: MatDialog, private wineApi : WineApiService) { }



  ngOnInit() {
    console.info(this.wine)
  }

  getWineImage(wineID: number) {
    return this.wineApi.getImageSourceUrl(wineID);
  }

  editWineDialog(wineId: number) {
    let dialogRef = this.dialog.open(WineEditFormComponent, {
      width: '500px',
      //height: '70vh',
      data: this.wine})
  }

}