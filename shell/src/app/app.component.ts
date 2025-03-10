import { loadRemoteModule } from '@angular-architects/native-federation';
import { NgComponentOutlet } from '@angular/common';
import { Component, inject, signal, Type } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SharedService } from '@shared/shared.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ResizeDrawerDirective } from './directives/resize/resize.directive';
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    MatSidenavModule,
    ResizeDrawerDirective,
    NgComponentOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  sharedService = inject(SharedService);
  notesApp: Type<any> | null = null;
  isNotesInitialized = signal(false);

  async initializeNotesApp() {
    if (this.isNotesInitialized()) return;
    this.notesApp = await loadRemoteModule('notes', './Component').then(
      (m) => m.AppComponent
    );
    this.isNotesInitialized.set(true);
  }

  constructor() {
    this.sharedService.log();
  }
}
