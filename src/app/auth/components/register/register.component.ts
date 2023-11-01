import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, combineLatest } from 'rxjs';
import { RegisterRequest } from '../../types/register-request';
import { Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthStateFacade } from '../../store/facade';
import { BackendErrorMessagesComponent } from '@shared/components/backend-error-messages/backend-error-messages.component';

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthStateFacade],
})
export class RegisterComponent implements OnDestroy {
  // currentUser$: Observable<CurrentUser | null | undefined> =
  //   this.authStateFacade.currentUser$;

  data$ = combineLatest({
    isSubmitting: this.authStateFacade.isSubmitting$,
    isLoading: this.authStateFacade.isLoading$,
    currentUser: this.authStateFacade.currentUser$,
    backendErrors: this.authStateFacade.backendErrors$,
  });

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
    private router: Router,
    private authStateFacade: AuthStateFacade
  ) {}

  onSubmit(): void {
    const request: RegisterRequest = {
      user: this.registerForm.getRawValue(),
    };

    this.authStateFacade.register(request);
  }

  onNavigateLink(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
