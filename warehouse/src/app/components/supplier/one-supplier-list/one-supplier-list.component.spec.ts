import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSupplierListComponent } from './one-supplier-list.component';

describe('OneSupplierListComponent', () => {
  let component: OneSupplierListComponent;
  let fixture: ComponentFixture<OneSupplierListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneSupplierListComponent]
    });
    fixture = TestBed.createComponent(OneSupplierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
