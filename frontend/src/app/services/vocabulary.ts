import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface VocabularyItem {
  word: string;
  exampleSentence: string;
  translatedSentence: string;
  meaning: string;
  isRevised?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Vocabulary {
  private apiUrl = environment.API_URL + '/vocabulary';

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

  resetVocabulary(): Observable<any> {
    return this.http.post(this.apiUrl + '/reset', {});
  }

  markRevised(word: string): Observable<any> {
    return this.http.patch(this.apiUrl + '/revised', { word });
  }
}

export { HttpClientModule } from '@angular/common/http';
