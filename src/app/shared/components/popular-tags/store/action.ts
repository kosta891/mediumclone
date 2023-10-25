import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const popularTagsActions = createActionGroup({
  source: 'popular tags',
  events: {
    'Get Popular Tags': emptyProps(),
    'Get Popular Tags Success': props<{
      popularTags: string[];
    }>(),
    'Get Popular Tags Failure': emptyProps(),
  },
});
