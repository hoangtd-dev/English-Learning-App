import { Routes } from '@angular/router';
import { AddVocabulary } from './pages/add-vocabulary/add-vocabulary';
import { ReviseVocabulary } from './pages/revise-vocabulary/revise-vocabulary';

export const routes: Routes = [
  { path: '', redirectTo: 'revise', pathMatch: 'full' },
  { path: 'add', component: AddVocabulary },
  { path: 'revise', component: ReviseVocabulary },
];
