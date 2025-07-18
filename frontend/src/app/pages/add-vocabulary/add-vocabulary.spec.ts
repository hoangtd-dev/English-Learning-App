import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVocabulary } from './add-vocabulary';

describe('AddVocabulary', () => {
  let component: AddVocabulary;
  let fixture: ComponentFixture<AddVocabulary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVocabulary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVocabulary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
