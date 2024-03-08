import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSupplierComponent } from './one-supplier.component';

describe('OneSupplierComponent', () => {
  let component: OneSupplierComponent;
  let fixture: ComponentFixture<OneSupplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneSupplierComponent]
    });
    fixture = TestBed.createComponent(OneSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
