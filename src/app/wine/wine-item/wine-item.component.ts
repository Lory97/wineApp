import { Component, OnInit , Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { WineApiService } from '../wine-api.service';
import { Wine } from '../wine';
import { WineEditFormComponent } from '../wine-edit-form/wine-edit-form.component';

@Component({
  selector: 'app-wine-item',
  templateUrl: './wine-item.component.html',
  styleUrls: ['./wine-item.component.css']
})
export class WineItemComponent implements OnInit {
  wine : Wine;

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<WineItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private wineApi : WineApiService) { }

  ngOnInit() {
    this.wine = this.data;
    console.log(this.data);
  }

  getWineImage(wineID:number){
    return this.wineApi.getImageSourceUrl(wineID);
  }

  editWineDialog(wineId:number){
     this.dialogRef.close();
     let dialogRef = this.dialog.open(WineEditFormComponent, {
       width: '400px',
       data: this.wine})
  }

}
