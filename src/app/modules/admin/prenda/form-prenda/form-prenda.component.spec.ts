import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPrendaComponent } from './form-prenda.component';

describe('FormPrendaComponent', () => {
  let component: FormPrendaComponent;
  let fixture: ComponentFixture<FormPrendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPrendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPrendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
