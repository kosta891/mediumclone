import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReplaySubject, combineLatest } from 'rxjs';
import { authActions } from '../../store/actions';
import { RegisterRequest } from '../../types/registerRequest';
import { Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthStateFacade } from '../../store/facade';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';

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
  // isSubmitting$ = this.store.select(selectIsSubmitting);
  // isSubmitting$: Observable<boolean> = this.authStateFacade.isSubmitting$;
  // isLoading$: Observable<boolean> = this.authStateFacade.isLoading$;
  // currentUser$: Observable<CurrentUser | null | undefined> =
  //   this.authStateFacade.currentUser$;
  // backendErrors$: Observable<BackendErrors | null> =
  //   this.authStateFacade.backendErrors$;

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
    private store: Store,
    private router: Router,
    private authStateFacade: AuthStateFacade
  ) {}

  onSubmit(): void {
    console.log(this.registerForm.getRawValue());
    const request: RegisterRequest = {
      user: this.registerForm.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request }));
  }

  onNavigateLink(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
