import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReplaySubject, combineLatest } from 'rxjs';
import { authActions } from '../../store/actions';

import { Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthStateFacade } from '../../store/facade';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';
import { LoginRequest } from '../../types/loginRegister';

@Component({
  selector: 'mc-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthStateFacade],
})
export class LoginComponent implements OnDestroy {
  data$ = combineLatest({
    isSubmitting: this.authStateFacade.isSubmitting$,
    isLoading: this.authStateFacade.isLoading$,
    currentUser: this.authStateFacade.currentUser$,
    backendErrors: this.authStateFacade.backendErrors$,
  });

  get form() {
    return {
      email: this.loginForm.get('email'),
      password: this.loginForm.get('password'),
    };
  }

  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  private destroy$ = new ReplaySubject<void>(1);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private authStateFacade: AuthStateFacade
  ) {}

  onSubmit(): void {
    console.log(this.loginForm.getRawValue());
    const request: LoginRequest = {
      user: this.loginForm.getRawValue(),
    };
    this.store.dispatch(authActions.login({ request }));
  }

  onNavigateLink(): void {
    this.router.navigate(['/register']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
