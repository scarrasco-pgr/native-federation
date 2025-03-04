import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAll } from '../store/user.feature';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-list',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  template: `@for(user of users(); track user.id ){
    <mat-card class="flex-shrink basis-80" appearance="outlined">
      <mat-card-header>
        <img
          mat-card-avatar
          [src]="user.image"
          [alt]="'Photo of ' + user.firstName"
        />
        <mat-card-title
          >{{ user.firstName }} {{ user.lastName }}</mat-card-title
        >
        <mat-card-subtitle>{{ user.company.department }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-actions>
        <a mat-icon-button [href]="'mailto:' + user.email"
          ><mat-icon>mail</mat-icon></a
        >
        <a mat-icon-button [href]="'tel:' + user.phone"
          ><mat-icon>phone</mat-icon></a
        >
        <a mat-icon-button [routerLink]="[user.id]"
          ><mat-icon>person</mat-icon></a
        >
      </mat-card-actions>
    </mat-card>
    } @empty {
    <div>No users found</div>
    }`
})
export class UserListComponent {
  users = inject(Store).selectSignal(selectAll);
}
