import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WineApiService } from '../wine-api.service';
import { Wine } from '../wine';

@Component({
  selector: 'app-wine-edit-form',
  templateUrl: './wine-edit-form.component.html',
  styleUrls: ['./wine-edit-form.component.css']
})
export class WineEditFormComponent implements OnInit {

  form : FormGroup;
  currentWine : Wine;

  constructor(private formBuilder : FormBuilder, public dialogRef: MatDialogRef<WineEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private wineApi : WineApiService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id : this.data.id,
      name : [this.data.name, Validators.required],
      year : [this.data.year, Validators.required],
      grapes : this.data.grapes,
      country : this.data.country,
      region : this.data.region,
      description : this.data.description,
      picture : this.data.picture,
      rating : this.data.rating,
      price : [this.data.price, Validators.required]
  })

  }

  updateWine(){

    if(this.form.valid){
      this.currentWine = new Wine();
      this.currentWine.id = this.form.value.id;
      this.currentWine.name = this.form.value.name;
      this.currentWine.country = this.form.value.country ? this.form.value.country.code : '';
      this.currentWine.region = this.form.value.region;
      this.currentWine.description = this.form.value.description;
      this.currentWine.price = this.form.value.price;
      this.currentWine.year = this.form.value.year;

      this.wineApi.update(this.currentWine).then( result =>{ 
        console.log(result);
        this.dialogRef.close();
      })
    }

  }

}
