import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WineApiService } from '../wine-api.service';
import { Wine } from '../wine';
import { CountriesService } from '../../country/countries.service';
import { Country } from '../../country/country';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wine-edit-form',
  templateUrl: './wine-edit-form.component.html',
  styleUrls: ['./wine-edit-form.component.css']
})
export class WineEditFormComponent implements OnInit {

  form : FormGroup;
  currentWine : Wine;
  countries : Array<Country>;
  countryControl = new FormControl();
  filteredOptions: Observable<Country[]>;

  constructor(private formBuilder : FormBuilder, public dialogRef: MatDialogRef<WineEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private wineApi : WineApiService, private countriesService : CountriesService) { }

  ngOnInit() {

    this.countriesService.getAll().subscribe(data => {
      this.countries = data;
    })

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

  this.countryControl.setValue(this.data.country);

  this.filteredOptions = this.countryControl.valueChanges
    .pipe(
      map(value => value),
      map(countryName => countryName ? this.filter(countryName) : this.countries.slice())
    );

  }

  filter(countryName: string): Country[] {
    return this.countries.filter(country =>
      country.code.toLowerCase().indexOf(countryName.toLowerCase()) === 0);
  }

  updateWine(){

    if(this.form.valid){
      this.currentWine = new Wine();
      this.currentWine.id = this.form.value.id;
      this.currentWine.name = this.form.value.name;
      this.currentWine.country = this.countryControl.value;
      this.currentWine.region = this.form.value.region;
      this.currentWine.description = this.form.value.description;
      this.currentWine.price = this.form.value.price;
      this.currentWine.rating = this.form.value.rating;
      this.currentWine.year = this.form.value.year;

      this.wineApi.update(this.currentWine).subscribe( result =>{ 
        console.log(result);
        this.dialogRef.close();
      })
    }

  }

  cancel(e: Event): void {
    e.preventDefault();
    this.dialogRef.close();
  }

}