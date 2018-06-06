import { Component, OnInit, Inject } from '@angular/core';
import { WineApiService } from '../wine-api.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WineItemContentComponent } from '.';
import { Wine } from '../wine';
import { WineEditFormComponent } from '../wine-edit-form/wine-edit-form.component';

@Component({
  selector: 'app-wine-item-dialog',
  template: `
    <app-wine-item-content [wine]="wine" (click)="editWineDialog()"></app-wine-item-content>
  `,
  styles: []
})
export class WineItemDialogComponent implements OnInit {
  wine: Wine = null;

  constructor(
    private wineApi: WineApiService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<WineItemContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data) {
      this.wine = this.data;
    }
  }

   editWineDialog() {
     this.dialogRef.close();
   }
}
