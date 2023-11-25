import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestLogsComponent } from './harvest-logs.component';

describe('HarvestLogsComponent', () => {
  let component: HarvestLogsComponent;
  let fixture: ComponentFixture<HarvestLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HarvestLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
