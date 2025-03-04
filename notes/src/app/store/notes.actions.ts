import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Note } from '../models/note';

export const UsersActions = createActionGroup({
  source: 'Notes',
  events: {
    'Load Notes': emptyProps(),
    'Load Notes Success': props<{ notes: Note[] }>(),
    'Load Notes Failure': props<{ error: string }>(),
    'Load Notes Completed': emptyProps(),
    'Filter Notes': props<{ filter: string }>(),
    'Filter Notes Success': props<{ notes: Note[] }>(),
    'Filter Notes Failure': props<{ error: string }>(),
  },
});
