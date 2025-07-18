import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VocabularyItem {
  word: string;
  exampleSentence: string;
  translatedSentence: string;
}

@Injectable({
  providedIn: 'root',
})
export class Vocabulary {
  private apiUrl = 'http://localhost:3000/api/vocabulary';

  constructor(private http: HttpClient) {}

  addVocabulary(item: VocabularyItem): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  getAllVocabulary(): Observable<VocabularyItem[]> {
    return this.http.get<VocabularyItem[]>(this.apiUrl);
  }

  getRandomVocabulary(): Observable<VocabularyItem> {
    return this.http.get<VocabularyItem>(`${this.apiUrl}/random`);
  }
}

export { HttpClientModule } from '@angular/common/http';
