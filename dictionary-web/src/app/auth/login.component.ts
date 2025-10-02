import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
      <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 class="mb-6 text-center text-3xl font-bold text-gray-800">
          Log In to My Dictionary
        </h2>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="mb-4">
            <input formControlName="username" type="text" placeholder="Username"
              class="w-full rounded border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none" />
          </div>

          <div class="mb-4 relative">
            <input
              formControlName="password"
              [type]="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="w-full rounded border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <!-- Eye icon toggle -->
            <button
              type="button"
              (click)="showPassword = !showPassword"
              class="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
            >
              <span *ngIf="showPassword">🙈</span>
              <span *ngIf="!showPassword">👁️</span>
            </button>
          </div>

          <button type="submit" [disabled]="form.invalid"
            class="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
            Log In
          </button>
        </form>

        <p *ngIf="msg" class="mt-4 text-center text-red-500">
          {{ msg }}
        </p>

        <p class="mt-6 text-center text-gray-600">
          Don’t have an account?
          <a routerLink="/signup" class="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  msg = '';
  form: FormGroup;  // explicitly typed
  showPassword = false;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const { username, password } = this.form.getRawValue(); // safe typed access
      this.auth.login(username, password).subscribe({
        next: (tokens) => {
          this.auth.saveTokens(tokens);
          this.router.navigate(['/landing']);
        },
        error: () => this.msg = 'Invalid username or password.'
      });
    }
  }
}
