import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MatCardModule, MatButtonModule, MatButtonToggleModule, MatDialogModule, MatInputModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WinesListComponent , DeleteWineDialogComponent } from './wine/wines-list/wines-list.component';
import { WineItemContentComponent, WineItemDialogComponent, WineItemPageComponent } from './wine/wine-item';

import { WineApiService } from './wine/wine-api.service';
import { WineAddFormComponent } from './wine/wine-add-form/wine-add-form.component';
import { WineSearchFormComponent } from './wine/wine-search-form/wine-search-form.component';
import { WineEditFormComponent } from './wine/wine-edit-form/wine-edit-form.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LoadingComponent } from './loading/loading.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/wines', pathMatch: 'full' },
  { path: 'wines', component: WinesListComponent },
  { path: 'wines/:id', component: WineItemPageComponent },
  { path: 'wines/add', component: WineAddFormComponent },
  { path: 'wines/delete/:id', component: DeleteWineDialogComponent },
  { path: 'wines/edit/:id', component: WineEditFormComponent },
  { path: '**', redirectTo: '/wines', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    WinesListComponent,
    WineItemContentComponent,WineItemDialogComponent, WineItemPageComponent,
    WineAddFormComponent,
    DeleteWineDialogComponent,
    WineSearchFormComponent,
    WineEditFormComponent,
    WineItemPageComponent,
    WineItemDialogComponent,
    PaginationComponent,
    LoadingComponent,
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
    MatAutocompleteModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [WineItemDialogComponent,LoadingComponent],
  providers: [WineApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
