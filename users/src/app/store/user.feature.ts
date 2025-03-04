import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import { UsersActions } from './user.actions';

export interface State extends EntityState<User> {
  loading: boolean;
  error: string | undefined;
  selectedUser: User | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();
export const initialState: State = adapter.getInitialState({
  error: undefined,
  loading: false,
  selectedUser: null,
});

const reducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(UsersActions.filterUsers, (state) => ({ ...state, loading: true })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.loadUsersCompleted, (state) => ({
    ...state,
    loading: false,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    adapter.setAll(users, state)
  ),
  on(UsersActions.filterUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.filterUsersSuccess, (state, { users }) =>
    adapter.setAll(users, state)
  ),
  on(UsersActions.loadUser, (state, { id }) => ({
    ...state,
    selectedUserId: id,
  })),
  on(UsersActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
  })),
  on(UsersActions.loadUserFailure, (state, { error }) => ({ ...state, error }))
);

export const usersFeature = createFeature({
  name: 'users',
  reducer,
  extraSelectors: ({ selectUsersState }) => ({
    ...adapter.getSelectors(selectUsersState),
  }),
});

export const {
  name,
  selectEntities,
  selectLoading,
  selectError,
  selectAll,
  selectSelectedUser,
  reducer: usersReducer,
} = usersFeature;
