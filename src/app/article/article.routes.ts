import { Route } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { provideEffects } from '@ngrx/effects';
import { ArticleEffects } from './store/effects';
import { provideState } from '@ngrx/store';
import { articleFeatureKey, articleReducer } from './store/reducers';

export const routes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(ArticleEffects),
      provideState(articleFeatureKey, articleReducer),
    ],
  },
];
