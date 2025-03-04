import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UsersActions } from './user.actions';

export const loadUsers = createEffect(
  (
    actions$ = inject(Actions),
    service = inject(UserService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() =>
        service.getUsers().pipe(
          map((users: User[]) => UsersActions.loadUsersSuccess({ users })),
          catchError((error: HttpErrorResponse) =>
            of(
              UsersActions.loadUsersFailure({
                error: error.message,
              })
            )
          ),
          finalize(() => store.dispatch(UsersActions.loadUsersCompleted()))
        )
      )
    );
  },
  { functional: true }
);

export const loadUser = createEffect(
  (
    actions$ = inject(Actions),
    service = inject(UserService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(UsersActions.loadUser),
      switchMap(({ id }) =>
        service.getUser(id).pipe(
          map((user: User) => UsersActions.loadUserSuccess({ user })),
          catchError((error: HttpErrorResponse) =>
            of(
              UsersActions.loadUserFailure({
                error: error.message,
              })
            )
          ),
          finalize(() => store.dispatch(UsersActions.loadUsersCompleted()))
        )
      )
    );
  },
  { functional: true }
);

export const filterUsers = createEffect(
  (
    actions$ = inject(Actions),
    service = inject(UserService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(UsersActions.filterUsers),
      switchMap(({ filter }) =>
        service.filterUsers(filter).pipe(
          map((users: User[]) => UsersActions.filterUsersSuccess({ users })),
          catchError((error: HttpErrorResponse) =>
            of(
              UsersActions.filterUsersFailure({
                error: error.message,
              })
            )
          ),
          finalize(() => store.dispatch(UsersActions.loadUsersCompleted()))
        )
      )
    );
  },
  { functional: true }
);
