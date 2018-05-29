import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineEditFormComponent } from './wine-edit-form.component';

describe('WineEditFormComponent', () => {
  let component: WineEditFormComponent;
  let fixture: ComponentFixture<WineEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
