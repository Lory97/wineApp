import { Component, OnInit, Inject } from '@angular/core';
import { WineApiService } from '../wine-api.service';
import { Wine } from '../wine';
import { WineItemComponent } from '../wine-item/wine-item.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-wines-list',
  templateUrl: './wines-list.component.html',
  styleUrls: ['./wines-list.component.css']
})
export class WinesListComponent implements OnInit {

  wines:Array<Wine>;

  constructor(private wineApiService : WineApiService, public dialog: MatDialog) { }

  ngOnInit() {

    this.wineApiService.created$.subscribe(
      data => {
        if(data){
          this.wines = [data,...this.wines]
        }
      });

    this.wineApiService.removed$.subscribe(
      value => {
        if (this.wines) {
          console.info(`removed wine ${value} in list`);
          this.wines = this.wines.filter(wine => wine.id !== value);
        }
      });

    this.wineApiService.getWines().then(response => {
      this.wines = response;
      console.log(this.wines);
    });
  }

  getWineImage(wineID:number){
    return this.wineApiService.getImageSourceUrl(wineID);
  }

  WineDialog(wineId:number): void {
    let dialogRef = this.dialog.open(WineItemComponent, {
      width: '400px',
      data: this.wines.find(wine => wine.id == wineId)
    });
 

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  deleteWineDialogConfirmation(wineId : number){
    let dialogRef = this.dialog.open(DeleteWineDialogComponent, {
      width: '250px',
      data: this.wines.find(wine => wine.id == wineId)
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
}

@Component({
  selector: 'delete-wine-dialog',
  templateUrl: 'delete-wine-dialog.html',
})
export class DeleteWineDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteWineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private wineApiService : WineApiService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteWine(){
    this.wineApiService.delete(this.data).then(response => console.log(response));
    this.dialogRef.close();
  }

}