import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: `./dictionary.component.html`
})
export class DictionaryComponent {
  msg = '';
  currentWord = '';
  defs: { definition: string; part_of_speech: string }[] = [];
  form!: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      word: ['', Validators.required]
    });
  }

  search() {
    const word = this.form.value.word;
    this.http.get<any>(`http://127.0.0.1:8000/api/lookup/${word}/`).subscribe({
      next: (res: any) => {
        this.currentWord = word!;
        this.defs = res.definitions;
      },
      error: () => (this.msg = 'Word not found or API error.')
    });
  }

  save(def: { definition: string; part_of_speech: string }) {
    this.http
      .post('http://127.0.0.1:8000/api/words/', {
        word: this.currentWord,
        definition: def.definition
      })
      .subscribe({
        next: () => (this.msg = 'Word saved!'),
        error: () => (this.msg = 'Failed to save word.')
      });
  }
}
