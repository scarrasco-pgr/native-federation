import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppModule } from './app.module';
import { HomeComponent } from './components/home.component';
@Component({
  imports: [AppModule, HomeComponent],
  selector: 'app-notes',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
