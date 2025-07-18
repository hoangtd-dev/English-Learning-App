import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseVocabulary } from './revise-vocabulary';

describe('ReviseVocabulary', () => {
  let component: ReviseVocabulary;
  let fixture: ComponentFixture<ReviseVocabulary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviseVocabulary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviseVocabulary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
