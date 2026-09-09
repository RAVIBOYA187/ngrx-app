import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserDetailsActions = createActionGroup({
  source: 'UserDetails',
  events: {
    'User UserDetailss': emptyProps(),
    'User UserDetailss Success': props<{ data: unknown }>(),
    'User UserDetailss Failure': props<{ error: unknown }>(),
  },
});
