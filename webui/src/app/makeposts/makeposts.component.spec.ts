import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakepostsComponent } from './makeposts.component';

describe('MakepostsComponent', () => {
  let component: MakepostsComponent;
  let fixture: ComponentFixture<MakepostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakepostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakepostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
