import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { SharedService } from '@shared/shared.service';
import { UsersActions } from '../store/notes.actions';
import { selectError, selectLoading } from '../store/notes.feature';
import { UserListComponent } from './note-list.component';
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserListComponent, MatProgressSpinnerModule],
  selector: 'app-notes-home',
  template: `@if(isLoading()){
    <mat-spinner></mat-spinner>
    } @else if (error()) {
    <div>{{ error() }}</div>
    } @else {
    <app-note-list class="w-full flex flex-col gap-4" />
    } `,
  host: { class: 'p-8 flex flex-col justify-center' },
})
export class HomeComponent implements OnInit {
  #store = inject(Store);
  sharedService = inject(SharedService);
  isLoading = this.#store.selectSignal(selectLoading);
  error = this.#store.selectSignal(selectError);
  ngOnInit(): void {
    this.sharedService.log();
    this.#store.dispatch(UsersActions.loadNotes());
  }
}
