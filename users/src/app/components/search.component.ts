import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { debounceTime, tap } from 'rxjs';
import { UsersActions } from '../store/user.actions';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  selector: 'app-search',
  template: `
    <mat-form-field class="w-full md:w-1/2">
      <mat-label>Search</mat-label>
      <input matInput type="text" [formControl]="filter" />
      @if (filter.value) {
      <button
        matSuffix
        mat-icon-button
        aria-label="Clear"
        (click)="filter.reset()"
      >
        <mat-icon>close</mat-icon>
      </button>
      } @else {

      <mat-icon matSuffix>search</mat-icon>
      }
    </mat-form-field>
  `,
})
export class SearchComponent {
  #fb = inject(FormBuilder);
  #store = inject(Store);
  filter = this.#fb.nonNullable.control('');
  filterTrigger = toSignal(
    this.filter.valueChanges.pipe(
      debounceTime(300),
      tap((filter: string) =>
        this.#store.dispatch(UsersActions.filterUsers({ filter }))
      )
    )
  );
}
