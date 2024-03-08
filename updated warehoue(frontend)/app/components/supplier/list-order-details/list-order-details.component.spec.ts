import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderDetailsComponent } from './list-order-details.component';

describe('ListOrderDetailsComponent', () => {
  let component: ListOrderDetailsComponent;
  let fixture: ComponentFixture<ListOrderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOrderDetailsComponent]
    });
    fixture = TestBed.createComponent(ListOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
