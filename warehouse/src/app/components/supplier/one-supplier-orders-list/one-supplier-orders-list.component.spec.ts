import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSupplierOrdersListComponent } from './one-supplier-orders-list.component';

describe('OneSupplierOrdersListComponent', () => {
  let component: OneSupplierOrdersListComponent;
  let fixture: ComponentFixture<OneSupplierOrdersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneSupplierOrdersListComponent]
    });
    fixture = TestBed.createComponent(OneSupplierOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
