import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ReplaySubject, combineLatest, filter, takeUntil } from 'rxjs';
import { AuthStateFacade } from 'src/app/auth/store/facade';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';
import { CurrentUser } from 'src/app/shared/types/current-user';
import { CurrentUserRequest } from 'src/app/shared/types/current-user-request';

@Component({
  selector: 'mc-settings',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    BackendErrorMessagesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser?: CurrentUser;

  data$ = combineLatest({
    isSubmitting: this.authStateFacade.isSubmitting$,
    backendErrors: this.authStateFacade.backendErrors$,
  });

  get form() {
    return {
      image: this.settingsForm.get('image'),
      username: this.settingsForm.get('username'),
      bio: this.settingsForm.get('bio'),
      email: this.settingsForm.get('email'),
      password: this.settingsForm.get('password'),
    };
  }

  settingsForm = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });

  private destroy$ = new ReplaySubject<void>(1);

  constructor(
    private fb: FormBuilder,
    private authStateFacade: AuthStateFacade
  ) {}

  ngOnInit(): void {
    this.authStateFacade.currentUser$
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('Current user is not set');
    }
    this.settingsForm.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    });
  }

  onSubmit() {
    if (!this.currentUser) {
      throw new Error('Current user is not set');
    }

    const currentUserRequest: CurrentUserRequest = {
      user: {
        ...this.currentUser,
        ...this.settingsForm.getRawValue(),
      },
    };

    this.authStateFacade.updateCurrentUser(currentUserRequest);
  }

  logout(): void {
    this.authStateFacade.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
