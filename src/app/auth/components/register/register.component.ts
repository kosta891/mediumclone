import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest';
import { Router } from '@angular/router';
import { selectIsSubmitting } from '../../store/selectors';
import { AuthState } from '../../types/authState';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthStateFacade } from '../../store/facade';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthStateFacade],
})
export class RegisterComponent implements OnInit {
  // isSubmitting$ = this.store.select(selectIsSubmitting);
  isSubmitting$: Observable<boolean> = this.authStateFacade.isSubmitting$;
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
    private authStateFacade: AuthStateFacade,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('renderovao');
  }

  onSubmit(): void {
    console.log(this.registerForm.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.registerForm.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request }));
    this.authService.register(request).subscribe((data) => console.log(data));
  }

  onNavigateLink(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
