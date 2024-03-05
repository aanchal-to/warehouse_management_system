import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierTableComponent } from './add-supplier-table.component';

describe('AddSupplierTableComponent', () => {
  let component: AddSupplierTableComponent;
  let fixture: ComponentFixture<AddSupplierTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSupplierTableComponent]
    });
    fixture = TestBed.createComponent(AddSupplierTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
