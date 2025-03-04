import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load User': props<{ id: string }>(),
    'Load User Success': props<{ user: User }>(),
    'Load User Failure': props<{ error: string }>(),
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),
    'Load Users Completed': emptyProps(),
    'Filter Users': props<{ filter: string }>(),
    'Filter Users Success': props<{ users: User[] }>(),
    'Filter Users Failure': props<{ error: string }>(),
  },
});
