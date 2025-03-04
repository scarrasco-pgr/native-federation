import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { UsersActions } from '../store/user.actions';
import { selectError, selectLoading } from '../store/user.feature';
import { SearchComponent } from './search.component';
import { UserListComponent } from './user-list.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserListComponent, SearchComponent, MatProgressSpinnerModule],
  selector: 'app-user-home',
  template: `<app-search class="w-full flex justify-center"/>
    @if(isLoading()){
    <mat-spinner></mat-spinner>
    } @else if (error()) {
    <div>{{ error() }}</div>
    } @else {
    <app-user-list class="w-full flex flex-wrap gap-4" />
    } `,
  host: { class: 'p-8 flex flex-col justify-center' },
})
export class HomeComponent implements OnInit {
  #store = inject(Store);
  isLoading = this.#store.selectSignal(selectLoading);
  error = this.#store.selectSignal(selectError);
  ngOnInit(): void {
    this.#store.dispatch(UsersActions.loadUsers());
  }
}
