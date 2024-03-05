import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventoryTableComponent } from './add-inventory-table.component';

describe('AddInventoryComponent', () => {
  let component: AddInventoryTableComponent;
  let fixture: ComponentFixture<AddInventoryTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInventoryTableComponent]
    });
    fixture = TestBed.createComponent(AddInventoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
