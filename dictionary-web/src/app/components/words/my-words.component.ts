import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-words',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './my-words.component.html',
  styleUrls: ['./my-words.component.css']
})
export class MyWordsComponent {
  word: string = '';
  definition: string | null = null;   // 👈 add definition

  constructor(private http: HttpClient) { }

  lookupWord() {
    console.log('lookupWord() called with:', this.word);

    if (!this.word) {
      this.definition = '⚠️ Please enter a word.';
      return;
    }

    this.http.get<any>(`http://127.0.0.1:8000/api/lookup/${this.word}/`).subscribe({
      next: (response) => {
        console.log('Response from API:', response);
        this.definition = response.definition || 'No definition found.';
      },
      error: (err) => {
        console.error('Error fetching definition:', err);
        this.definition = '❌ Error fetching definition.';
      }
    });
  }

}
