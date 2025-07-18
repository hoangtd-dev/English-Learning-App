import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
  menuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigateTo(page: 'revise' | 'add' | 'list') {
    this.menuOpen = false;
    if (page === 'revise') {
      this.router.navigate(['/revise']);
    } else if (page === 'add') {
      this.router.navigate(['/add']);
    } else if (page === 'list') {
      this.router.navigate(['/list']);
    }
  }
}
