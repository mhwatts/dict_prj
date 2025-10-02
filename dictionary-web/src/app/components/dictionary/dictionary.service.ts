// dictionary/dictionary.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DictionaryService {
  constructor(private http: HttpClient) { }
  lookup(word: string) {
    return this.http.get<{ word: string, definitions: { definition: string, part_of_speech: string }[] }>(`/api/lookup/${encodeURIComponent(word)}/`);
  }
}
