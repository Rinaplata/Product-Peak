import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedProductsComponent } from './published-products.component';

describe('PublishedProductsComponent', () => {
  let component: PublishedProductsComponent;
  let fixture: ComponentFixture<PublishedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishedProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublishedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
