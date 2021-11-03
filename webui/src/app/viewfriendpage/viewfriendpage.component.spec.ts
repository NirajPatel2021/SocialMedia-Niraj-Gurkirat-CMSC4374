import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfriendpageComponent } from './viewfriendpage.component';

describe('ViewfriendpageComponent', () => {
  let component: ViewfriendpageComponent;
  let fixture: ComponentFixture<ViewfriendpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewfriendpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewfriendpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
