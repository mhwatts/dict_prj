import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-word',
  standalone: true,
  imports: [CommonModule, FormsModule],   // 👈 important
  templateUrl: './add-edit-word.component.html',   // 👈 not my-words
})
export class AddEditWordComponent {
  word = '';
  definition = '';

  constructor(private http: HttpClient, private router: Router) { }

  goToLanding() {
    this.router.navigate(['/landing']);
  }

  lookupWord() {
    if (!this.word) return;

    this.http.get<{ word: string; definition: string }>(
      `http://127.0.0.1:8000/api/lookup/${this.word}/`
    ).subscribe({
      next: (res) => this.definition = res.definition,
      error: (err) => {
        console.error('Lookup failed', err);
        this.definition = 'Error fetching definition';
      }
    });
  }
}
