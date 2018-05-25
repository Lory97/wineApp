import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineSearchFormComponent } from './wine-search-form.component';

describe('WineSearchFormComponent', () => {
  let component: WineSearchFormComponent;
  let fixture: ComponentFixture<WineSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
