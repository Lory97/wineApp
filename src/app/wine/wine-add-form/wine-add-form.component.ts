import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WineApiService } from '../wine-api.service';
import { Wine } from '../wine';

@Component({
  selector: 'app-wine-add-form',
  templateUrl: './wine-add-form.component.html',
  styleUrls: ['./wine-add-form.component.css']
})
export class WineAddFormComponent implements OnInit {

  form : FormGroup;
  newWine : Wine;

   
  constructor(
    private formBuilder : FormBuilder,
    public dialogRef: MatDialogRef<WineAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private wineApi : WineApiService ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        id : -1,
        name : '',
        year : 0,
        grapes : '',
        country : '',
        region : '',
        description : '',
        picture : 'generic.png',
        rating : 0,
        price : 0,
    })
  }

  createwine(){
    this.wineApi.save(this.form.value as Wine).then(data => {this.newWine = data; console.log(this.newWine); });
    this.dialogRef.close();
  }

}
