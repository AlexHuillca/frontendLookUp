import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrendaComponent } from './list-prenda.component';

describe('ListPrendaComponent', () => {
  let component: ListPrendaComponent;
  let fixture: ComponentFixture<ListPrendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPrendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPrendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
