import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Note } from '../models/note';
import { UsersActions } from './notes.actions';

export interface State extends EntityState<Note> {
  loading: boolean;
  error: string | undefined;
}

export const adapter: EntityAdapter<Note> = createEntityAdapter<Note>();
export const initialState: State = adapter.getInitialState({
  error: undefined,
  loading: false,
});

const reducer = createReducer(
  initialState,
  on(UsersActions.loadNotes, (state) => ({ ...state, loading: true })),
  on(UsersActions.filterNotes, (state) => ({ ...state, loading: true })),
  on(UsersActions.filterNotesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.loadNotesCompleted, (state) => ({
    ...state,
    loading: false,
  })),
  on(UsersActions.loadNotesSuccess, (state, { notes }) =>
    adapter.setAll(notes, state)
  ),
  on(UsersActions.filterNotesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.filterNotesSuccess, (state, { notes }) =>
    adapter.setAll(notes, state)
  )
);

export const notesFeature = createFeature({
  name: 'notes',
  reducer,
  extraSelectors: ({ selectNotesState }) => ({
    ...adapter.getSelectors(selectNotesState),
  }),
});

export const {
  name,
  selectEntities,
  selectLoading,
  selectError,
  selectAll,
  reducer: usersReducer,
} = notesFeature;
