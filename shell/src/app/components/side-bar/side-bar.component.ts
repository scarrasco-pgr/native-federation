import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  standalone: true,
  selector: 'sidenav-autosize-example',
  templateUrl: 'side-bar.component.html',
  imports: [MatSidenavModule, MatButtonModule],
})
export class SidenavAutosizeExample {
  showFiller = false;
}
