import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VnuScheduleComponent } from './vnu-schedule.component';

describe('VnuScheduleComponent', () => {
  let component: VnuScheduleComponent;
  let fixture: ComponentFixture<VnuScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VnuScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VnuScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
