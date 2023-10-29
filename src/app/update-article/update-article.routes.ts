import { Route } from '@angular/router';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { UpdateArticleService } from './services/update-article.service';
import { provideEffects } from '@ngrx/effects';
import { UpdateArticleEffects } from './store/effects';
import {
  updateArticleFeatureKey,
  updateArticleReducer,
} from './store/reducers';
import { provideState } from '@ngrx/store';

export const routes: Route[] = [
  {
    path: '',
    component: UpdateArticleComponent,
    providers: [
      UpdateArticleService,
      provideEffects(UpdateArticleEffects),
      provideState(updateArticleFeatureKey, updateArticleReducer),
    ],
  },
];
