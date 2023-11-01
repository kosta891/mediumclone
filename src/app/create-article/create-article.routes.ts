import { Route } from '@angular/router';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { CreateArticleService } from './services/create-article.service';
import { provideEffects } from '@ngrx/effects';
import { CreateArticleEffects } from './store/effects';
import {
  createArticleFeatureKey,
  createArticleReducer,
} from './store/reducers';
import { provideState } from '@ngrx/store';
import { CreateArticleStateFacade } from './store/facade';

export const routes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      CreateArticleService,
      CreateArticleStateFacade,
      provideEffects(CreateArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer),
    ],
  },
];
