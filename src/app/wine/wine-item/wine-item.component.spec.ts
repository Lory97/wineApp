import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineItemContentComponent } from './wine-item-content.component';

describe('WineItemContentComponent', () => {
  let component: WineItemContentComponent;
  let fixture: ComponentFixture<WineItemContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineItemContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineItemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
