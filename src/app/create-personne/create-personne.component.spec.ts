import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonneComponent } from './create-personne.component';

describe('CreatePersonneComponent', () => {
  let component: CreatePersonneComponent;
  let fixture: ComponentFixture<CreatePersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePersonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
