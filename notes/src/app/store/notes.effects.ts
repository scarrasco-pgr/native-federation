import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import { Note } from '../models/note';
import { UserService } from '../services/note.service';
import { UsersActions } from './notes.actions';

export const loadUsers = createEffect(
  (
    actions$ = inject(Actions),
    service = inject(UserService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(UsersActions.loadNotes),
      switchMap(() =>
        service.getNotes().pipe(
          map((notes: Note[]) => UsersActions.loadNotesSuccess({ notes })),
          catchError((error: HttpErrorResponse) =>
            of(
              UsersActions.loadNotesFailure({
                error: error.message,
              })
            )
          ),
          finalize(() => store.dispatch(UsersActions.loadNotesCompleted()))
        )
      )
    );
  },
  { functional: true }
);
