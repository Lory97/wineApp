import { Component, OnInit, Inject } from '@angular/core';
import { WineApiService, WinesQueryResponse } from '../wine-api.service';
import { Wine } from '../wine';
import { WineItemDialogComponent } from '../wine-item';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent} from '@angular/material';

@Component({
  selector: 'app-wines-list',
  templateUrl: './wines-list.component.html',
  styleUrls: ['./wines-list.component.css']
})
export class WinesListComponent implements OnInit {

  wines:Array<Wine>;
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

   // MatPaginator Output
   pageEvent: PageEvent;

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


     this.wineApiService.updated$.subscribe(
      (updatedWine: Wine) => {
        if (this.wines) {
          console.info(`updated wine ${updatedWine.id} in list`);
          const index = this.wines.findIndex(wine => wine.id === updatedWine.id);
          if (index > -1) {
            this.wines[index] = updatedWine;
          }
        }
      }
    );

    this.wineApiService.search$.subscribe(
      data =>{
        if(data.length > 0){
          this.wines = data;
        }else{
          console.log('no term in search, load initial wines list')
          this.wineApiService.getWines().subscribe(response => {
            this.wines = response;
          });
        }
      }

    )
    this.wineApiService.getWines().subscribe(response => {
      this.wines = response;
      this.length = this.wines.length;
      console.log(this.wines);
    });
    //this.winePagequery();
  }

  // winePagequery(){
  //   this.wineApiService.query(null,null,null,this.limit).subscribe((response:WinesQueryResponse) => {
  //     this.wines = response.items; this.length = response.totalCount;
  //   });
  // }

  getWineImage(wineID:number){
    return this.wineApiService.getImageSourceUrl(wineID);
  }

  WineDialog(wineId:number): void {
    let dialogRef = this.dialog.open(WineItemDialogComponent, {
      width: '600px',
      // height: '80vh',
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


  // goToPage(n: number): void {
  //   this.page = n;
  //   this.winePagequery();  }

  // onNext(): void {
  //   this.page++;
  //   this.winePagequery();
  // }

  // onPrev(): void {
  //   this.page--;
  //   this.winePagequery();
  // }


  
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
    this.wineApiService.delete(this.data).subscribe(response => { 
      console.log(response);
      this.dialogRef.close();
    });
    
  }
  

}
