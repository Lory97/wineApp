import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineAddFormComponent } from './wine-add-form.component';

describe('WineAddFormComponent', () => {
  let component: WineAddFormComponent;
  let fixture: ComponentFixture<WineAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
