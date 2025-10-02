import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup.component';
import { MyWordsComponent } from './components/words/my-words.component';
import { AddEditWordComponent } from './components/words/add-edit-word/add-edit-word.component';

import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './auth/login.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';

export const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'my-words', component: MyWordsComponent },
  { path: 'add-word', component: AddEditWordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'add-edit', component: AddEditWordComponent },
];


