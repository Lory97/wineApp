import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WineApiService } from '../wine-api.service';
import { Wine } from '../wine';
import { Country } from '../../country/country';
import { CountriesService } from '../../country/countries.service';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wine-add-form',
  templateUrl: './wine-add-form.component.html',
  styleUrls: ['./wine-add-form.component.css']
})
export class WineAddFormComponent implements OnInit {

  form : FormGroup;
  newWine : Wine;
  countries : Array<Country>;
  filteredOptions: Observable<Country[]>;
  countryControl = new FormControl();

   
  constructor(
    private formBuilder : FormBuilder,
    public dialogRef: MatDialogRef<WineAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private wineApi : WineApiService, private countriesService : CountriesService ) { }

  ngOnInit() {

    this.countriesService.getAll().subscribe(data => {
      this.countries = data;
    })

    this.form = this.formBuilder.group({
        id : -1,
        name : ['',Validators.required],
        year : [0, Validators.compose([Validators.required, Validators.pattern('^[12][0-9]{3}$')])],
        grapes : '',
        country : '',
        region : '',
        description : '',
        picture : 'generic.png',
        rating : 0,
        price : [0,Validators.required],
    });

    this.filteredOptions = this.countryControl.valueChanges
    .pipe(
      map(value => value),
      map(countryCode => countryCode ? this.filter(countryCode) : this.countries.slice())
    );
  
   }

   filter(countryCode: string): Country[] {
    return this.countries.filter(country =>
      country.code.toLowerCase().indexOf(countryCode.toLowerCase()) === 0);
  }

  displayFn(countryCode?: string): string | undefined {
      return countryCode ? countryCode : undefined;
  }

  createwine(){
      if(this.form.valid){
        this.newWine = this.form.value;
        this.newWine.country = this.countryControl.value;

      this.wineApi.save(this.newWine).subscribe(data => {
        this.newWine.id = data.id;
        console.log(this.newWine); 
        this.dialogRef.close(); 
      });
    }
  }

}