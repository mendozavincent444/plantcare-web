import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFarmComponent } from './add-farm.component';

describe('AddFarmComponent', () => {
  let component: AddFarmComponent;
  let fixture: ComponentFixture<AddFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFarmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
