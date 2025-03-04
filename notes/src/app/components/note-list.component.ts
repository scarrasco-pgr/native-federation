import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectAll } from '../store/notes.feature';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-note-list',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  template: `@for(note of notes(); track note.id ){
    <mat-card class="flex-shrink flex-grow" appearance="outlined">
      <mat-card-header>
        <mat-card-title>{{ note.user.fullName }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        {{ note.body }}
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>
          {{ note.likes }}<mat-icon> thumb_up </mat-icon>
        </button>
        <a mat-button>{{ note.user.username }}<mat-icon>person</mat-icon></a>
      </mat-card-actions>
    </mat-card>
    } @empty {
    <div>No users found</div>
    }`,
})
export class UserListComponent {
  notes = inject(Store).selectSignal(selectAll);
}
