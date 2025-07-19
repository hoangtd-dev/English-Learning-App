import { Component, signal } from '@angular/core';
import { Vocabulary, VocabularyItem } from '../../services/vocabulary';

@Component({
  selector: 'app-vocabulary-list',
  standalone: true,
  imports: [],
  templateUrl: './vocabulary-list.html',
  styleUrl: './vocabulary-list.css',
})
export class VocabularyList {
  vocabularies = signal<VocabularyItem[]>([]);
  loading = signal(false);

  constructor(private vocabService: Vocabulary) {
    this.loadVocabularies();
  }

  loadVocabularies() {
    this.loading.set(true);
    this.vocabService.getAllVocabulary().subscribe({
      next: (items) => {
        this.vocabularies.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.vocabularies.set([]);
        this.loading.set(false);
      },
    });
  }
}
