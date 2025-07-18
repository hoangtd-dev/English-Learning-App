import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Vocabulary, VocabularyItem } from '../../services/vocabulary';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-vocabulary',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-vocabulary.html',
  styleUrl: './add-vocabulary.css',
})
export class AddVocabulary {
  vocabForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private vocabService: Vocabulary) {
    this.vocabForm = this.fb.group({
      word: ['', Validators.required],
      exampleSentence: ['', Validators.required],
      translatedSentence: ['', Validators.required],
      meaning: ['', Validators.required],
    });
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.vocabForm.valid) {
      const item: VocabularyItem = this.vocabForm.value;
      this.vocabService.addVocabulary(item).subscribe({
        next: () => {
          this.successMessage = 'Vocabulary added!';
          this.vocabForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'Failed to add vocabulary.';
        },
      });
    }
  }
}
