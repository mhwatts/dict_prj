// auth/signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
      <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 class="mb-6 text-center text-3xl font-bold text-gray-800">
          Sign Up for My Dictionary
        </h2>
        <p class="mb-6 text-center text-gray-600">
          A tool to collect, reference, and reflect on words.
        </p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="mb-4">
            <input formControlName="username" type="text" placeholder="Username"
              class="w-full rounded border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none" />
          </div>

          <div class="mb-4">
            <input formControlName="email" type="email" placeholder="Email"
              class="w-full rounded border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none" />
          </div>

          <div class="mb-4">
            <input formControlName="password" type="password" placeholder="Password"
              class="w-full rounded border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none" />
          </div>

          <div class="mb-4">
            <input formControlName="confirmpassword" type="password" placeholder="Confirm Password"
              class="w-full rounded border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none" />
          </div>

          <button type="submit" [disabled]="form.invalid"
            class="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
            Sign Up
          </button>
        </form>

        <p *ngIf="msg"
          class="mt-4 text-center"
          [ngClass]="{ 'text-green-600': success, 'text-red-500': !success }">
          {{ msg }}
        </p>

        <p class="mt-6 text-center text-gray-600">
          Already have an account?
          <a routerLink="/login" class="text-blue-600 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  `
})
export class SignupComponent {
  msg = '';
  form: FormGroup;
  success = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.msg = 'Please fill in all required fields.';
      this.success = false;
      return;
    }

    const { username, password, confirmpassword } = this.form.value;

    if (password !== confirmpassword) {
      this.msg = 'Passwords do not match.';
      this.success = false;
      return;
    }

    // call the backend (drop email for now unless we add it in Django)
    this.auth.register(username!, password!).subscribe({
      next: () => {
        this.msg = 'Registered successfully!';
        this.success = true;
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.msg = 'Registration failed.';
        this.success = false;
      }
    });
  }

}
