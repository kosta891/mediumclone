import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selectors from './selectors';
import { AuthState } from '../types/authState';

@Injectable()
export class AuthStateFacade {
  isSubmitting$: Observable<boolean> = this.store.pipe(
    select(Selectors.selectIsSubmitting)
  );

  constructor(private store: Store<{ auth: AuthState }>) {}
  // @Inject(CONFIG) private config: Config,
}
