import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { register } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: []
})
export class RegisterComponent implements OnInit {
  get form() {
    return {
      username: this.registerForm.get('username'),
      email: this.registerForm.get('email'),
      password: this.registerForm.get('password'),
    };
  }

  registerForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  private destroy$ = new ReplaySubject<void>(1);
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('renderovao');
  }

  onSubmit(): void {
    console.log('mrk', this.registerForm.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.registerForm.getRawValue(),
    };
    this.store.dispatch(register({ request }));
  }

  onNavigateLink(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
