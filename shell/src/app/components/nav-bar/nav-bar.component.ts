import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { ThemePicker } from '../theme-picker/theme-picker.component';
@Component({
  selector: 'app-nav-bar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    ThemePicker,
  ],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  #store = inject(Store);
  toggle = output();

  refresh() {
    this.#store.dispatch({ type: '[Notes] Load Notes' });
  }
}
