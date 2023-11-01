import { Route } from '@angular/router';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { provideEffects } from '@ngrx/effects';
import { UpdateArticleEffects } from './store/effects';
import {
  updateArticleFeatureKey,
  updateArticleReducer,
} from './store/reducers';
import { provideState } from '@ngrx/store';
import { UpdateArticleStateFacade } from './store/facade';

export const routes: Route[] = [
  {
    path: '',
    component: UpdateArticleComponent,
    providers: [
      provideEffects(UpdateArticleEffects),
      provideState(updateArticleFeatureKey, updateArticleReducer),
      UpdateArticleStateFacade,
    ],
  },
];
