import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MatCardModule, MatButtonModule, MatButtonToggleModule, MatDialogModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WinesListComponent , DeleteWineDialogComponent } from './wine/wines-list/wines-list.component';
import { WineItemComponent } from './wine/wine-item/wine-item.component';
import { WineApiService } from './wine/wine-api.service';
import { WineAddFormComponent } from './wine/wine-add-form/wine-add-form.component';
import { WineSearchFormComponent } from './wine/wine-search-form/wine-search-form.component';
import { WineEditFormComponent } from './wine/wine-edit-form/wine-edit-form.component';

const appRoutes: Routes = [
  { path: 'wines',     component: WinesListComponent },
  { path: 'wines/:id',  component: WineItemComponent },
  { path: 'wines/add', component : WineAddFormComponent },
  { path: 'wines/delete/:id', component : DeleteWineDialogComponent},
  { path : 'wines/edit/:id',component : WineEditFormComponent },
  { path: '',   redirectTo: '/wines', pathMatch: 'full' },
  ];


@NgModule({
  declarations: [
    AppComponent,
    WinesListComponent,
    WineItemComponent,
    WineAddFormComponent,
    DeleteWineDialogComponent,
    WineSearchFormComponent,
    WineEditFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule, 
    MatButtonToggleModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WineApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
