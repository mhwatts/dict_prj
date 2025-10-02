import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private apiUrl = 'http://127.0.0.1:8000/api';  // backend base URL

  constructor(private http: HttpClient) { }

  // Lookup word definition
  lookupWord(word: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lookup/${word}/`);
  }

  // (you can also have other methods like getWords(), addWord(), etc.)
}
