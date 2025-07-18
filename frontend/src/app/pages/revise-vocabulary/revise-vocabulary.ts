import { Component, signal } from '@angular/core';
import { Vocabulary, VocabularyItem } from '../../services/vocabulary';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-revise-vocabulary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './revise-vocabulary.html',
  styleUrl: './revise-vocabulary.css',
})
export class ReviseVocabulary {
  vocabItem: VocabularyItem | null = null;
  userGuess = '';
  showHint = false;
  showFullHint = false;
  feedback = '';
  loading = false;

  constructor(private vocabService: Vocabulary) {
    this.getRandomWord();
  }

  getRandomWord() {
    this.loading = true;
    this.feedback = '';
    this.userGuess = '';
    this.showHint = false;
    this.showFullHint = false;
    this.vocabService.getRandomVocabulary().subscribe({
      next: (item) => {
        this.vocabItem = item;
        this.loading = false;
      },
      error: () => {
        this.vocabItem = null;
        this.loading = false;
      },
    });
  }

  getMaskedSentence(): string {
    if (!this.vocabItem) return '';
    // Replace the word (case-insensitive) with blank
    const re = new RegExp(this.vocabItem.word, 'gi');
    return this.vocabItem.exampleSentence.replace(re, '____');
  }

  toggleHint() {
    if (!this.showHint) {
      this.showHint = true;
    } else if (!this.showFullHint) {
      this.showFullHint = true;
    } else {
      this.showHint = false;
      this.showFullHint = false;
    }
  }

  getHint(): string {
    if (!this.vocabItem) return '';
    if (this.showFullHint) return this.vocabItem.word;
    if (this.showHint) return this.vocabItem.word[0] + '...';
    return '';
  }

  checkAnswer() {
    if (!this.vocabItem) return;
    if (
      this.userGuess.trim().toLowerCase() === this.vocabItem.word.toLowerCase()
    ) {
      this.feedback = 'Correct!';
    } else {
      this.feedback = `Incorrect. The word was: ${this.vocabItem.word}`;
    }
  }
}
