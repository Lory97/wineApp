import { Component } from '@angular/core';
import { WineAddFormComponent } from './wine/wine-add-form/wine-add-form.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ma Cave';

  constructor(public dialog: MatDialog){}

    openDialog(): void {
    let dialogRef = this.dialog.open(WineAddFormComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
