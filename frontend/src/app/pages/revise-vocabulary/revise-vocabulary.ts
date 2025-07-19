import { Component, signal } from '@angular/core';
import { Vocabulary, VocabularyItem } from '../../services/vocabulary';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-revise-vocabulary',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './revise-vocabulary.html',
  styleUrl: './revise-vocabulary.css',
})
export class ReviseVocabulary {
  vocabItem = signal<VocabularyItem | null>(null);
  hintStep = signal(0); // 0: no hint, 1: meaning, 2: first char, 3: full word
  showAnswer = signal(false);
  loading = signal(false);
  feedback = signal('');
  resetting = signal(false);
  totalCount = signal(0);
  revisedCount = signal(0);

  answerForm: FormGroup;

  constructor(private vocabService: Vocabulary, private fb: FormBuilder) {
    this.answerForm = this.fb.group({
      answer: ['', Validators.required],
    });
    this.loadCounts();
    this.getRandomWord();
  }

  loadCounts() {
    this.vocabService.getAllVocabulary().subscribe({
      next: (items) => {
        this.totalCount.set(items.length);
        this.revisedCount.set(items.filter((item) => item.isRevised).length);
      },
      error: () => {
        this.totalCount.set(0);
        this.revisedCount.set(0);
      },
    });
  }

  getRandomWord() {
    // Mark current word as revised before getting next word
    const currentItem = this.vocabItem();
    if (currentItem && this.showAnswer()) {
      this.vocabService.markRevised(currentItem.word).subscribe({
        next: () => {
          this.loadCounts(); // Update counts after marking as revised
        },
      });
    }

    this.loading.set(true);
    this.feedback.set('');
    this.answerForm.reset();
    this.hintStep.set(0);
    this.showAnswer.set(false);
    this.vocabService.getRandomVocabulary().subscribe({
      next: (item) => {
        this.vocabItem.set(item);
        this.loading.set(false);
      },
      error: () => {
        this.vocabItem.set(null);
        this.loading.set(false);
      },
    });
  }

  getMaskedSentence(): string {
    const item = this.vocabItem();
    if (!item) return '';
    const re = new RegExp(item.word, 'gi');
    return item.exampleSentence.replace(re, '__________');
  }

  toggleHint() {
    this.hintStep.set((this.hintStep() + 1) % 4);
  }

  getHint(): string {
    const item = this.vocabItem();
    if (!item) return '';
    if (this.hintStep() === 1) return item.meaning;
    if (this.hintStep() === 2) return item.word[0] + '...';
    if (this.hintStep() === 3) return item.word;
    return '';
  }

  checkAnswer() {
    const item = this.vocabItem();
    if (!item) return;
    const guess = this.answerForm.value.answer?.trim();
    if (!guess) {
      this.feedback.set('Please enter your answer.');
      this.showAnswer.set(false);
      return;
    }
    if (guess.toLowerCase() === item.word.toLowerCase()) {
      this.feedback.set('Correct!');
      this.showAnswer.set(true);
      // Don't mark as revised here - will be done when clicking Next
    } else {
      this.feedback.set('Incorrect');
    }
  }

  resetAll() {
    this.resetting.set(true);
    this.vocabService.resetVocabulary().subscribe({
      next: () => {
        this.resetting.set(false);
        this.loadCounts(); // Update counts after reset
        this.getRandomWord();
      },
      error: () => {
        this.resetting.set(false);
      },
    });
  }
}
